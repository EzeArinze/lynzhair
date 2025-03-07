import connectDB from "@/lib/dbconnect";
import { Product } from "@/models/ProductModel";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Product ID is missing" },
        { status: 401 }
      );
    }

    const details = await Product.findById(id);

    if (!details) {
      return NextResponse.json(
        { message: "Product not found", details: [] },
        { status: 404 }
      );
    }

    return NextResponse.json(details, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong while fetching details" },
      { status: 500 }
    );
  }
}
