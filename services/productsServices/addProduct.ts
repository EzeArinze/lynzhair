import axios from "axios";
import { ProductTypes } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (initialData: Omit<ProductTypes, "_id">) => {
      const response = await axios.post("/api/v2/products", initialData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data; // ✅ Return only the new product data
    },

    onMutate: async (newProduct) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      // Get the current products in the cache
      const previousProducts = queryClient.getQueryData<ProductTypes[]>([
        "products",
      ]);

      // Create a temporary ID for the new product (UI update)
      const tempId = `temp-${Date.now()}`;
      const optimisticProduct = { ...newProduct, _id: tempId };

      // Update the cache optimistically
      queryClient.setQueryData<ProductTypes[]>(["products"], (oldData) => {
        return oldData ? [...oldData, optimisticProduct] : [optimisticProduct];
      });

      return { previousProducts, tempId };
    },

    onSuccess: (newProduct, _, context) => {
      queryClient.setQueryData<ProductTypes[]>(["products"], (oldData) => {
        if (!oldData) return [newProduct];

        // Replace the temporary product with the actual one from the API
        return oldData.map((product) =>
          product._id === context?.tempId ? newProduct : product
        );
      });

      toast.success("Product added successfully");
    },

    onError: (error, _, context) => {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");

      // Rollback in case of failure
      if (context?.previousProducts) {
        queryClient.setQueryData(["products"], context.previousProducts);
      }
    },
  });
}
