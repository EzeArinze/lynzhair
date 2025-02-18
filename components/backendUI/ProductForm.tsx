"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon } from "lucide-react";

import { productFormSchema } from "@/lib/Zschema";
import PreviewImage from "./PreviewImage";

interface ProductFormProps {
  initialData?: {
    name: string;
    description: string;
    category: string;
    discount?: number;
    price: number;
    stock: number;
    image?: File | string;
  };
  onSubmit: (data: {
    name: string;
    description: string;
    category: string;
    price: number;
    discount?: number;
    stock: number;
    image?: File;
  }) => void;
}

export function ProductForm({ initialData, onSubmit }: ProductFormProps) {
  const [image, setImage] = useState<File | null>(null);
  const [formDetails, setFormDetails] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    price: initialData?.price || 0,
    discount: initialData?.discount || 0,
    stock: initialData?.stock || 0,
  });
  const [previewUrl, setPreviewUrl] = useState<string | File>(
    initialData?.image || ""
  );
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validate = productFormSchema.safeParse(formDetails);

    if (!validate.success) {
      alert(validate.error.errors[0].message);
      return;
    }

    const { name, category, price, stock, description, discount } = formDetails;

    onSubmit({
      name,
      description,
      category,
      discount,
      price,
      stock,
      image: image || undefined,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full sm:max-w-lg mx-auto p-6 shadow-lg rounded-lg overflow-y-scroll max-h-[80vh] hide-scrollbar"
    >
      <div className="grid gap-4 sm:grid-cols-2 ">
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
          <Input
            id="category"
            name="category"
            value={formDetails.category}
            onChange={handleChange}
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
        <Label htmlFor="image">Product Image</Label>
        <div className="mt-1 flex flex-col items-center">
          <Input
            id="image"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
          />
          {previewUrl ? (
            <PreviewImage
              previewUrl={previewUrl}
              handleRemoveImage={handleRemoveImage}
            />
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex justify-center items-center"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Upload Image
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
