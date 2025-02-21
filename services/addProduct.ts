import axios from "axios";
import { Product } from "@/utils/types";

export async function addProduct(
  initialData: Omit<Product, "id">,
  onClose: () => void
) {
  try {
    await axios.post("/api/products", initialData, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Product added successfully");
    onClose();
  } catch (error) {
    console.error("Error adding product:", error);
  }
}
