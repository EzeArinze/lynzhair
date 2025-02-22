import axios from "axios";
import { ProductTypes } from "@/utils/types";

export async function addProduct(
  initialData: Omit<ProductTypes, "_id">,
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
