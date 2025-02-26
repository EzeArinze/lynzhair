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
import formatCurrency from "@/utils/formatCurrency";
import { ProductForm } from "./ProductForm";
import ProductImages from "./ProductImages";
import { useGetProducts } from "@/services/getProduct";
import { ProductTypes } from "@/utils/types";
import { useAddProduct } from "@/services/addProduct";
import { useDeleteProduct } from "@/services/deleteProduct";
import { useUpdateProduct } from "@/services/updateProduct";
import ProductSkeleton from "../ProductSkeleton";

export default function ProductList() {
  const { data: productsData, isFetching } = useGetProducts();
  const { mutate: handleAddProducts, isPending: isAddingProduct } =
    useAddProduct();
  const { mutate: handleUpadteProduct, isPending: isEditing } =
    useUpdateProduct();
  const { mutate: handleDelete, isPending } = useDeleteProduct();

  const [editingProduct, setEditingProduct] = useState<ProductTypes | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddProduct = async (newProduct: Omit<ProductTypes, "_id">) => {
    handleAddProducts(newProduct, {
      onSuccess: () => {
        setIsDialogOpen((prev) => !prev);
      },
    });
  };

  const handleEditProduct = async (productData: ProductTypes) => {
    console.log(productData);
    handleUpadteProduct(productData, {
      onSuccess: () => {
        setIsEditDialogOpen((prev) => !prev);
      },
    });
  };

  const handleDeleteProduct = async (id: string) => {
    handleDelete(id);
  };

  if (isFetching) return <ProductSkeleton />;

  return (
    <>
      <div className="flex justify-end mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            {/* Add Product Form */}
            <ProductForm
              onSubmit={handleAddProduct}
              isProcessing={isEditing || isAddingProduct}
              // onClose={() => setIsDialogOpen((prev) => !prev)}
            />
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
            {!productsData?.length ? (
              <TableRow>
                <TableCell>
                  <p className="text-center pt-4 font-semibold">
                    No data found
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              productsData?.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    {/* product images */}
                    <ProductImages images={product.images} />
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
                      <Dialog
                        open={isEditDialogOpen}
                        onOpenChange={setIsEditDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setEditingProduct(product);
                              setIsEditDialogOpen((prev) => !prev);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="w-[85%] h-3/4 mx-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Product</DialogTitle>
                          </DialogHeader>
                          <DialogDescription>
                            Edit product form
                          </DialogDescription>
                          {/* Edit Product Form */}
                          {editingProduct && (
                            <ProductForm
                              initialData={editingProduct || undefined}
                              isProcessing={isEditing || isAddingProduct}
                              onSubmit={(data) =>
                                handleEditProduct({
                                  ...data,
                                  _id: editingProduct._id,
                                })
                              }
                              // onClose={() => setIsEditDialogOpen((prev) => !prev)}
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this product?"
                            )
                          ) {
                            handleDeleteProduct(product._id);
                          }
                        }}
                        disabled={isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
