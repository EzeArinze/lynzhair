import connectDB from "@/lib/dbconnect";
import { Product } from "@/models/ProductModel";
import { NextResponse } from "next/server";

// Updating a product in the database api/updateProduct/[id]
// PUT /api/updateProduct/[id]
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const { name, description, category, price, discount, stock } =
      await req.json();

    if (!name || !description || !category || !price || !stock) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // ✅ Preserve previously uploaded images
    // const existingImages = existingProduct.images || [];

    const product = {
      name,
      description,
      category,
      price,
      discount,
      stock,
      // images: existingImages,
    };

    // Update the product in the database
    const updatedData = await Product.findByIdAndUpdate(id, product);

    return NextResponse.json(updatedData, { status: 200 });
  } catch (err: unknown) {
    console.error("Error saving product:", err);
    return NextResponse.json(
      { error: "Something went wrong while saving the product" },
      { status: 500 }
    );
  }
}
