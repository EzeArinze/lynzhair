import connectDB from "@/lib/dbconnect";
import { Product } from "@/models/ProductModel";

export async function GET() {
  try {
    await connectDB();
    const categories = await Product.distinct("category");

    return new Response(
      JSON.stringify({ message: "Successfully fetched data", categories }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 500,
    });
  }
}
