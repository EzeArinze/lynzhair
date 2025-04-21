// import { Order } from "@/models/OrderModel";
// import connectDB from "@/lib/dbconnect";
// import { NextResponse } from "next/server";
// import mongoose from "mongoose";

// export async function GET() {
//   try {
//     await connectDB();

//     // Check if Product model exists, if not, just import it
//     if (!mongoose.models.Product) {
//       await import("@/models/ProductModel");
//     }

//     //get the email from the auth provider or the request body
//     const orderPattern = new RegExp("example@gmail.com", "i");

//     const query = {
//       $or: [{ email: orderPattern }],
//     };

//     const orders = await Order.find(
//       query,
//       "orderNumber email products orderDate totalPrice status"
//     )
//       .populate("products.product", "name images")
//       .sort({ orderDate: -1 })
//       .lean();

//     return NextResponse.json(orders, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     return NextResponse.json(
//       { message: "Error fetching orders", error: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

import { Order } from "@/models/OrderModel";
import connectDB from "@/lib/dbconnect";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { authClient } from "@/lib/better-auth/authClient";

export async function GET(req: Request) {
  try {
    await connectDB();

    // Check if Product model exists, if not, just import it
    if (!mongoose.models.Product) {
      await import("@/models/ProductModel");
    }

    // Get the user's session from the request
    const { data: session } = await authClient.getSession({
      fetchOptions: { headers: req.headers },
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
