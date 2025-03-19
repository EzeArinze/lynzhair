import { useAddProduct } from "@/services/productsServices/addProduct";
import { useDeleteProduct } from "@/services/productsServices/deleteProduct";
import { useGetProducts } from "@/services/productsServices/getProduct";
import { useUpdateProduct } from "@/services/productsServices/updateProduct";

export function useProductListServices() {
  const { data: productsData, isFetching } = useGetProducts();
  const { mutate: handleAddProducts, isPending: isAddingProduct } =
    useAddProduct();
  const { mutate: handleUpadteProduct, isPending: isEditing } =
    useUpdateProduct();
  const { mutate: handleDelete, isPending } = useDeleteProduct();

  return {
    productsData,
    isFetching,
    handleAddProducts,
    isAddingProduct,
    handleUpadteProduct,
    isEditing,
    handleDelete,
    isPending,
  };
}
