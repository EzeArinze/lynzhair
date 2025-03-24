"use client";

import { useSearchParams } from "next/navigation";
// import HairCategorySelector from "./CategoriesSelector";
import { useGetProductByCategories } from "@/services/productsServices/getProductByCategories";
import { ProductCard } from "./ProductCard";
import dynamic from "next/dynamic";
import LoadingSpinner from "../Loader";

const HairCategorySelector = dynamic(() => import("./CategoriesSelector"), {
  ssr: false,
});

function CategoriesPageComponent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";

  const { data, isFetching } = useGetProductByCategories(category);
  const categoryProducts = Array.isArray(data) ? data : [];

  return (
    <section>
      <h2 className="font-bold p-4 m-2">{"Categories Page".toUpperCase()}</h2>
      <div className="mb-6">
        <HairCategorySelector />
      </div>

      {isFetching ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto md:ml-2 lg:ml-2 w-[90%] sm:w-full ">
          {categoryProducts &&
            categoryProducts.map((categoryProduct) => (
              <ProductCard
                key={categoryProduct._id}
                product={categoryProduct}
              />
            ))}
        </div>
      )}
    </section>
  );
}

export default CategoriesPageComponent;
