import { Order } from "@/models/OrderModel";
import connectDB from "@/lib/dbconnect";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/lib/better-auth/auth"; // Import the auth instance

export async function GET(req: Request) {
  try {
    await connectDB();

    // Ensure the Product model is loaded
    if (!mongoose.models.Product) {
      await import("@/models/ProductModel");
    }

    // Retrieve the user's session using headers
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized: No user email found" },
        { status: 401 }
      );
    }

    const userEmail = session.user.email; // Extract the user's email

    // Create a case-insensitive regex pattern for the user's email
    const orderPattern = new RegExp(userEmail, "i");

    const query = {
      $or: [{ email: orderPattern }],
    };

    // Fetch orders from the database
    const orders = await Order.find(
      query,
      "orderNumber email products orderDate totalPrice status"
    )
      .populate("products.product", "name images")
      .sort({ orderDate: -1 })
      .lean();

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Error fetching orders", error: (error as Error).message },
      { status: 500 }
    );
  }
}
