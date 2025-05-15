"use client";
import { useGetCommerceProduct } from "@/services/productsServices/getCommerceProducts";
import { Banner } from "./Banner";
import HairCategorySelector from "./CategoriesSelector";
import { FilterSidebar } from "./Filter";
import { MobileFilters } from "./MobileFilter";

import { useNuqsContext } from "@/context/use-nuqs-state";
import { useSearchParamsValues } from "@/utils/searchParams";
import ProductGrid from "./ProductGrid";
import ErrorSituation from "../Error";

function HomePage() {
  const { minPrice, maxPrice, setMaxPrice, setMinPrice, onClearPrice } =
    useNuqsContext();

  const { sort, minPriceParam, maxPriceParam } = useSearchParamsValues();

  const {
    data: products,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
  } = useGetCommerceProduct(minPriceParam, maxPriceParam, sort);

  if (isError) return <ErrorSituation situation="Products" />;

  const allProducts = products?.pages.flatMap((page) => page.products) || [];

  return (
    <div>
      <Banner />
      <p className="p-6 text-center font-semibold">Categories</p>
      <HairCategorySelector />

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div />
            <div className="flex items-center gap-4">
              <MobileFilters />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters - Hidden on mobile */}
            <div className="hidden lg:block lg:flex-shrink-0">
              <FilterSidebar
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                onClearFilters={onClearPrice}
              />
            </div>

            <div className="flex-grow">
              <ProductGrid
                products={allProducts}
                loading={isLoading}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
