import { ProductTypes } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedData: ProductTypes) => {
      const response = await axios.put(
        `/api/v2/updateProduct/${updatedData._id}`,
        updatedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data; // ✅ Return only the updated product data
    },

    onMutate: async (updatedData) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previousProducts = queryClient.getQueryData<ProductTypes[]>([
        "products",
      ]);

      queryClient.setQueryData<ProductTypes[]>(["products"], (oldData) => {
        if (!oldData) return [];
        return oldData.map((product) =>
          product._id === updatedData._id
            ? {
                ...product,
                name: updatedData.name,
                category: updatedData.category,
                price: updatedData.price,
                stock: updatedData.stock,
                description: updatedData.description,
                discount: updatedData.discount,
              }
            : product
        );
      });

      return { previousProducts };
    },

    onSuccess: () => {
      toast.success("Product updated successfully");
    },

    onError: (error, _, context) => {
      console.error("Error updating product:", error.message);
      toast.error("Failed to update product.");

      // Rollback in case of an error
      if (context?.previousProducts) {
        queryClient.setQueryData(["products"], context.previousProducts);
      }
    },
  });
};
