import axios from "axios";
import { ProductTypes } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (initialData: Omit<ProductTypes, "_id">) =>
      await axios.post("/api/products", initialData, {
        headers: { "Content-Type": "application/json" },
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Refresh the product list
      toast.success("Product added successfully");
    },

    onError: (error) => {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    },
  });
}
