"use client";

import { useState } from "react";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductForm } from "./ProductForm";
import ProductImages from "./ProductImages";
import { useProductListServices } from "@/utils/productListServices";
import formatCurrency from "@/utils/formatCurrency";
import ProductSkeleton from "../ProductSkeleton";
import { ProductTypes } from "@/utils/types";
import { Modal } from "../Modal";

export default function ProductList() {
  const {
    productsData,
    isFetching,
    handleAddProducts,
    isAddingProduct,
    handleUpadteProduct,
    isEditing,
    handleDelete,
    isPending,
  } = useProductListServices();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductTypes | null>(
    null
  );

  const openEditModal = (product: ProductTypes) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleAddProduct = async (newProduct: Omit<ProductTypes, "_id">) => {
    handleAddProducts(newProduct, {
      onSuccess: () => {
        setIsAddModalOpen(false);
      },
    });
  };

  const handleEditProduct = async (productData: ProductTypes) => {
    handleUpadteProduct(productData, {
      onSuccess: () => {
        setIsEditModalOpen(false);
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
        <Button onClick={() => setIsAddModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>

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
              <TableCell colSpan={6} className="text-center pt-4 font-semibold">
                No data found
              </TableCell>
            </TableRow>
          ) : (
            productsData?.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
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
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEditModal(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
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

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Product"
      >
        <ProductForm
          onSubmit={handleAddProduct}
          onClose={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Product"
      >
        {editingProduct && (
          <ProductForm
            initialData={editingProduct}
            isProcessing={isEditing || isAddingProduct}
            onSubmit={(data) =>
              handleEditProduct({ ...data, _id: editingProduct._id })
            }
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>
    </>
  );
}
