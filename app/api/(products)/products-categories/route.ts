import connectDB from "@/lib/dbconnect";
import { Product } from "@/models/ProductModel";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    if (!category) {
      return new Response("Search parameter is missing", { status: 400 });
    }

    const categoryPattern = new RegExp(`^${category}$`, "i");
    const categoryProducts = await Product.find({ category: categoryPattern });

    if (!categoryProducts.length) {
      return NextResponse.json(
        { message: "No products found for this category", data: [] },
        { status: 404 }
      );
    }

    return NextResponse.json(categoryProducts, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: (error as Error).message },
      { status: 500 }
    );
  }
}
