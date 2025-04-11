import { Order } from "@/models/OrderModel";
import connectDB from "@/lib/dbconnect";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();

    // Check if Product model exists, if not, just import it
    if (!mongoose.models.Product) {
      await import("@/models/ProductModel");
    }

    //get the email from the auth provider or the request body
    const orderPattern = new RegExp("example@gmail.com", "i");

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
