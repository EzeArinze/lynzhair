import { LIMIT } from "@/lib/constant/conatant";
import connectDB from "@/lib/dbconnect";
import { Product } from "@/models/ProductModel";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const minPrice = url.searchParams.get("minPrice");
    const maxPrice = url.searchParams.get("maxPrice");
    const sort = url.searchParams.get("sort");
    const pageNumber = Number(url.searchParams.get("page")) || 0;

    //Filter object
    const filter: { price?: { $gte?: number; $lte?: number } } = {};

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    //Sort object
    const sortOption: { [key: string]: 1 | -1 } = {};

    if (sort) {
      const [field, order] = sort.split(":");
      if (field && (order === "asc" || order === "desc")) {
        sortOption[field] = order === "desc" ? -1 : 1;
      }
    }

    const products = await Product.find(filter)
      .sort(sortOption)
      .limit(LIMIT)
      .skip(pageNumber * LIMIT);

    const hasNextPage = products.length === LIMIT;

    return NextResponse.json(
      { products, page: hasNextPage ? pageNumber + 1 : null },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching products:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
