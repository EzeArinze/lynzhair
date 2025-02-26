import cloudinary from "@/lib/cloudinary";
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

    const { name, description, category, price, discount, stock, images } =
      await req.json();

    if (!name || !description || !category || !price || !stock || !images) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Extract existing image IDs
    const existingImages = existingProduct.images.map(
      (img: { public_id: string }) => img.public_id
    );

    // Extract new image IDs if they exist
    const newImagePublicIds = images
      .filter((img: { public_id: string }) => img.public_id) // Only include existing images
      .map((img: { public_id: string }) => img.public_id);

    // Find images that need to be deleted (old ones not in new images)
    const imagesToDelete = existingImages.filter(
      (id) => !newImagePublicIds.includes(id)
    );

    // Delete only those images
    const deletePromises = imagesToDelete.map((public_id) =>
      cloudinary.uploader.destroy(public_id)
    );
    await Promise.all(deletePromises);

    // Upload new images
    const newImageUploadPromises = images
      .filter(
        (img: string) => typeof img === "string" && img.startsWith("data:image")
      ) // Only upload new base64 images
      .map(async (image: string) => {
        const uploadedResponse = await cloudinary.uploader.upload(image, {
          folder: "products",
        });
        return {
          public_url: uploadedResponse.secure_url,
          public_id: uploadedResponse.public_id,
        };
      });

    const uploadedNewImages = await Promise.all(newImageUploadPromises);

    // Merge existing images that were kept + new ones that were uploaded
    const updatedImages = [
      ...images.filter((img: { public_id: string }) => img.public_id),
      ...uploadedNewImages,
    ];

    const product = {
      name,
      description,
      category,
      price,
      discount,
      stock,
      images: updatedImages,
    };

    // Update the product in the database
    await Product.findByIdAndUpdate(id, product);

    return NextResponse.json(
      { message: "Product saved successfully" },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Error saving product:", err);
    return NextResponse.json(
      { error: "Something went wrong while saving the product" },
      { status: 500 }
    );
  }
}
