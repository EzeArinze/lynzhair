"use client";
import { useGetCommerceProduct } from "@/services/productsServices/getCommerceProducts";
import { Banner } from "./Banner";
import HairCategorySelector from "./CategoriesSelector";
import { FilterSidebar } from "./Filter";
import { MobileFilters } from "./MobileFilter";
import { ProductGrid } from "./ProductGrid";
import { useNuqsContext } from "@/context/use-nuqs-state";

function HomePage() {
  const {
    sortOption,
    setSortOption,
    onSortClear,
    onClearPrice,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
  } = useNuqsContext();

  const { data: products } = useGetCommerceProduct();

  const getActiveFiltersCount = () => {
    let count = 0;
    if (minPrice > 0 || maxPrice < 1000) count++; //come back and check this logic later
    return count;
  };

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
              <MobileFilters
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                onClearFilters={onClearPrice}
                activeFiltersCount={getActiveFiltersCount()}
              />
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
                sortOption={sortOption}
                setSortOption={setSortOption}
                clearState={onSortClear}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
