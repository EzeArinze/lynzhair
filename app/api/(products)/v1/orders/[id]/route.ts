import connectDB from "@/lib/dbconnect";
import { Order } from "@/models/OrderModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// GET /api/v1/orders/[id]
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    await connectDB();

    if (!mongoose.models.Product) {
      await import("@/models/ProductModel");
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "No id provided" }, { status: 400 });
    }

    const orderDetails = await Order.findById(id)
      .populate("products.product")
      .lean();

    if (!orderDetails) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(orderDetails, { status: 200 });
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json(
      { message: "Order faild to fetch" },
      { status: 500 }
    );
  }
}
