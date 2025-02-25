import cloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/dbconnect";
import { Product } from "@/models/ProductModel";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    //Later get the Admin session and check if the user is an admin before deleting the product

    await connectDB();

    const { id } = await params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const deletePromises = product.images.map((img: { public_id: string }) =>
      cloudinary.uploader.destroy(img.public_id)
    );
    await Promise.all(deletePromises);

    await product.deleteOne();

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json(
      { message: "Product fetched successfully" },
      { status: 200 }
    );
  }
}
