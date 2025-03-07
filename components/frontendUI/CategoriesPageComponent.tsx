"use client";

import { useSearchParams } from "next/navigation";
import HairCategorySelector from "./CategoriesSelector";
import { useGetProductByCategories } from "@/services/productsServices/getProductByCategories";

function CategoriesPageComponent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";

  const { data: categoryProducts } = useGetProductByCategories(category);
  console.log(categoryProducts);

  return (
    <div>
      <h2 className="m-auto font-bold p-4">CategoriesPage</h2>
      <HairCategorySelector />
    </div>
  );
}

export default CategoriesPageComponent;
