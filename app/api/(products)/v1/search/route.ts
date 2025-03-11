import connectDB from "@/lib/dbconnect";
import { Product } from "@/models/ProductModel";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("query");

    if (!search) {
      return new Response("Search parameter is missing", { status: 400 });
    }

    const searchPattern = new RegExp(search, "i");

    const query = {
      $or: [
        { name: searchPattern },
        { description: searchPattern },
        { category: searchPattern },
      ],
    };

    const searchResult = await Product.find(query);

    return NextResponse.json(searchResult, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 400 });
  }
}
