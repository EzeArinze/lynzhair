"use client";

import { useSearchParams } from "next/navigation";
import HairCategorySelector from "./CategoriesSelector";
import { useGetProductByCategories } from "@/services/productsServices/getProductByCategories";
import { ProductCard } from "./ProductCard";

function CategoriesPageComponent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";

  const { data } = useGetProductByCategories(category);
  const categoryProducts = Array.isArray(data) ? data : [];

  return (
    <section>
      <h2 className="m-auto font-bold p-4">CategoriesPage</h2>
      <div className="mb-6">
        <HairCategorySelector />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto md:ml-2 lg:ml-2">
        {categoryProducts &&
          categoryProducts.map((categoryProduct) => (
            <ProductCard key={categoryProduct._id} product={categoryProduct} />
          ))}
      </div>
    </section>
  );
}

export default CategoriesPageComponent;
