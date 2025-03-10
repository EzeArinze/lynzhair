"use client";
import { useGetCommerceProduct } from "@/services/productsServices/getCommerceProducts";
import { Banner } from "./Banner";
import HairCategorySelector from "./CategoriesSelector";
import { FilterSidebar } from "./Filter";
import { MobileFilters } from "./MobileFilter";
import { ProductGrid } from "./ProductGrid";

function HomePage() {
  const { data: products } = useGetCommerceProduct();

  const allProducts = products?.pages.flatMap((page) => page.products) || [];

  console.log(allProducts);

  const getActiveFiltersCount = () => {
    let count = 0;
    if (1 > 0 || 1 < 1000) count++;
    return count;
  };

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
                // priceRange={priceRange}
                // setPriceRange={setPriceRange}
                onClearFilters={() => {}}
                activeFiltersCount={getActiveFiltersCount()}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters - Hidden on mobile */}
            <div className="hidden lg:block lg:flex-shrink-0">
              <FilterSidebar onClearFilters={() => {}} />
            </div>

            <div className="flex-grow">
              <ProductGrid
                products={allProducts}
                sortOption={"featured"}
                setSortOption={() => {}}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
