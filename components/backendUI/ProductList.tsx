"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Trash2, PlusCircle } from "lucide-react";
// import { ProductForm } from "./ProductForm"
import Image from "next/image";
import formatCurrency from "@/lib/formatCurrency";
import { ProductForm } from "./ProductForm";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image?: File | string;
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Smartphone X",
    description: "The latest smartphone in the market",
    category: "Electronics",
    price: 599.99,
    stock: 50,
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Designer T-shirt",
    description: "A cool designer t-shirt",
    category: "Apparel",
    price: 29.99,
    stock: 100,
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Wireless Earbuds",
    description: "High-quality wireless earbuds",
    category: "Electronics",
    price: 79.99,
    stock: 30,
    image: "/placeholder.svg",
  },
];

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddProduct = (newProduct: Omit<Product, "id">) => {
    const id = (products.length + 1).toString();
    setProducts([...products, { ...newProduct, id }]);
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[85%] h-3/4 mx-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <DialogDescription>Create product form</DialogDescription>
            <ProductForm onSubmit={handleAddProduct} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden md:table-cell">Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image
                    src={
                      typeof product.image === "string"
                        ? product.image
                        : "/placeholder.svg"
                    }
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {product.category}
                </TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {product.stock}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setEditingProduct(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-[85%] h-3/4 mx-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Product</DialogTitle>
                        </DialogHeader>
                        {editingProduct && (
                          <>
                            <DialogDescription>Product edit</DialogDescription>
                            <ProductForm
                              initialData={editingProduct}
                              onSubmit={(data) =>
                                handleEditProduct({
                                  ...data,
                                  id: editingProduct.id,
                                })
                              }
                            />
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
