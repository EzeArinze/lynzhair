import { Product } from "@/utils/types";

export async function addProduct(
  initialData: Omit<Product, "id">,
  onClose: () => void
) {
  try {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(initialData),
    });

    if (!res.ok) throw new Error("Failed to add product");

    console.log("Product added successfully");
    onClose();
  } catch (error) {
    console.error(error);
    console.log("Something went wrong!");
  }
}
