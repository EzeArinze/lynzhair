import { NextResponse } from "next/server";
import connectDB from "@/lib/dbconnect";
import User from "@/models/User";
import { authClient } from "@/lib/better-auth/authClient"; // Import Better Auth client

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    // Ensure required fields are provided
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Sign up the user using Better Auth
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name: username,
      },
      {
        onError: (ctx) => {
          // Handle the error
          if (ctx.error.status === 403) {
            alert("Please verify your email address");
          }
        },
      }
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Save the new user to MongoDB
    const newUser = new User({
      username,
      email,
      betterAuthId: data.user.id, // Store Better Auth user ID
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
