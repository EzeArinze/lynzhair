import connectDB from "@/lib/dbconnect";
import { Order } from "@/models/OrderModel";
import { NextResponse } from "next/server";

export async function DELETE({ params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "No Id was provides" },
        { status: 400 }
      );
    }

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    await order.deleteOne();

    return NextResponse.json(
      {
        message: "Order deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Delete the order: " +
          (error instanceof Error ? error.message : "Unknown error"),
      },
      { status: 500 }
    );
  }
}
