import cloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/dbconnect";
import { Product } from "@/models/ProductModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    //Later get the Admin session and check if the user is an admin before deleting the product

    await connectDB();

    const { id } = await params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const deletePromises = product.images.map(
      async (img: { public_id: string }) => {
        try {
          return await cloudinary.uploader.destroy(img.public_id);
        } catch (error) {
          console.error(
            `Failed to delete image with public_id: ${img.public_id}`,
            error
          );
        }
      }
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
      { message: "Product failed to Delete" },
      { status: 500 }
    );
  }
}
