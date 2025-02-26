import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const deleteProduct = async (id: string) => {
  try {
    const res = await axios.delete(`/api/products/${id}`);
    console.log(res.data.message);
  } catch (error) {
    console.log(error);
  }
};

export default deleteProduct;
// Compare this snippet from app/api/products/%5Bid%5D/route.ts:

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await axios.delete(`/api/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete the product.");
    },
  });
};
