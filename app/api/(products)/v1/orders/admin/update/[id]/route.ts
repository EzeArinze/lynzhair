import connectDB from "@/lib/dbconnect";
import { Order } from "@/models/OrderModel";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "No id found, please provide an ID" },
        { status: 403 }
      );
    }

    const { status } = await req.json();

    if (!status) {
      return NextResponse.json(
        { message: "Missing required ID" },
        { status: 400 }
      );
    }

    const existingOrder = await Order.findById(id);

    if (!existingOrder)
      return NextResponse.json(
        { message: "Order to update not found" },
        { status: 404 }
      );

    await Order.findByIdAndUpdate(id, { status });

    return NextResponse.json(
      { message: "Order Updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Update Order" +
          (error instanceof Error
            ? error.message
            : "Faild to Update order status"),
      },
      { status: 500 }
    );
  }
}
