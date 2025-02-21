import cloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/dbconnect";
import { Product } from "@/models/ProductModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, description, category, price, discount, stock, images } =
      await req.json();

    if (!name || !description || !category || !price || !stock || !images) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const imageUploadPromises = images.map(async (image: string) => {
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
      return uploadedResponse.secure_url;
    });

    const uploadedImageUrls = await Promise.all(imageUploadPromises);

    const product = new Product({
      name,
      description,
      category,
      price,
      discount,
      stock,
      images: uploadedImageUrls,
    });
    await product.save();

    return NextResponse.json(
      { message: "Product saved successfully" },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong while saving the product" },
      { status: 500 }
    );
  }
}
