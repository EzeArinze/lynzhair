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

    const orders = await Order.find(
      {},
      "orderNumber customerName status createdAt orderDate totalPrice"
    )
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
