import { BASE_URL } from "@/lib/constant/env";
import { ProductTypes } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      return id;
    },

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      // Get the current products before deletion
      const previousProducts = queryClient.getQueryData<ProductTypes[]>([
        "products",
      ]);

      queryClient.setQueryData<ProductTypes[]>(["products"], (oldData) => {
        return oldData ? oldData.filter((product) => product._id !== id) : [];
      });

      return { previousProducts };
    },

    onSuccess: () => {
      toast.success("Product deleted successfully");
    },

    onError: (error, _, context) => {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete the product.");

      // Rollback in case of failure
      if (context?.previousProducts) {
        queryClient.setQueryData(["products"], context.previousProducts);
      }
    },
  });
};
