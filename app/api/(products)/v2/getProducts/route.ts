import connectDB from "@/lib/dbconnect";
import { Product } from "@/models/ProductModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const data = await Product.find({}).sort({ orderDate: -1 }).lean();
    if (!data) {
      return NextResponse.json(
        { message: "No Product Data in the DataBase" },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
