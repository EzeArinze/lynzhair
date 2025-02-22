"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon } from "lucide-react";
import { productFormSchema } from "@/lib/Zschema";
import PreviewImage from "./PreviewImage";
import type { ProductFormProps } from "@/utils/types";
import { CategorySelect } from "./CategoriesSelector";
// import { addProduct } from "@/services/addProduct";

export function ProductForm({
  initialData,
  onSubmit,
}: // onClose,
ProductFormProps) {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>(
    initialData?.images ? initialData.images.map((img) => String(img)) : []
  );

  const [formDetails, setFormDetails] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    price: initialData?.price || 0,
    discount: initialData?.discount || 0,
    stock: initialData?.stock || 0,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" || name === "discount"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validate = productFormSchema.safeParse(formDetails);
    if (!validate.success) {
      alert(validate.error.errors[0].message);
      return;
    }

    const { name, category, price, stock, description, discount } = formDetails;

    const imageBase64Promises = images.map((image) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(image);
      });
    });

    const base64Images = await Promise.all(imageBase64Promises);

    onSubmit({
      _id: initialData?._id || "",
      name,
      description,
      category,
      discount,
      price,
      stock,
      images: base64Images, // Send Base64 to API
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles]);
      setPreviewUrls((prev) => [
        ...prev,
        ...newFiles.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full sm:max-w-lg mx-auto p-6 shadow-lg rounded-lg overflow-y-scroll max-h-[80vh] hide-scrollbar"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            name="name"
            value={formDetails.name}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <CategorySelect
            value={formDetails.category}
            onChange={(value) =>
              setFormDetails((prev) => ({
                ...prev,
                category: value,
              }))
            }
            className="w-full"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formDetails.description}
          onChange={handleChange}
          className="w-full"
          rows={3}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            name="price"
            value={formDetails.price}
            onChange={handleChange}
            min="0"
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="discount">Discount</Label>
          <Input
            id="discount"
            type="number"
            name="discount"
            value={formDetails.discount}
            onChange={handleChange}
            min="0"
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            name="stock"
            value={formDetails.stock}
            onChange={handleChange}
            min="0"
            className="w-full"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="images" className="text-sm font-medium">
          Product Images
        </Label>
        <div className="mt-1">
          <Input
            id="images"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
            multiple
            ref={fileInputRef}
          />
          {previewUrls.length > 0 ? (
            <>
              <PreviewImage images={previewUrls} onRemove={handleRemoveImage} />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full mt-4"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Add More Images
              </Button>
            </>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 transition-colors"
            >
              <ImageIcon className="h-8 w-8 mb-2 text-gray-400" />
              <span className="text-sm text-gray-500">Upload Images</span>
            </Button>
          )}
        </div>
      </div>
      <Button type="submit" className="w-full">
        Save Product
      </Button>
    </form>
  );
}
