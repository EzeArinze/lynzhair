// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ProductCard } from "./ProductCard";
// import { productType } from "@/utils/types";
// import { ProductCardSkeleton } from "./ProductCardSkeleton";
// import { useInView } from "react-intersection-observer";
// import { useNuqsContext } from "@/context/use-nuqs-state";

// interface ProductGridProps {
//   products: productType[];
//   loading?: boolean;
//   fetchNextPage?: () => void;
//   hasNextPage?: boolean;
//   isFetchingNextPage?: boolean;
// }

// export function ProductGrid({
//   products,
//   loading,
//   fetchNextPage,
//   hasNextPage,
//   isFetchingNextPage,
// }: ProductGridProps) {
//   const { sortOption, setSortOption, onSortClear } = useNuqsContext();

//   const handleSortOption = (value: string | null) => {
//     if (value === "all") {
//       onSortClear?.();
//     }
//     setSortOption(value);
//   };

//   const { ref } = useInView({
//     threshold: 1,
//     onChange: (inView) => {
//       if (inView && !isFetchingNextPage && hasNextPage) {
//         fetchNextPage?.();
//       }
//     },
//   });

//   return (
//     <div className="flex-1">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
//         <h2 className="text-2xl font-bold">All Products</h2>

//         <Select
//           value={sortOption ?? undefined}
//           onValueChange={handleSortOption}
//         >
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Sort by" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All</SelectItem>
//             <SelectItem value="price:asc">Price: Low to High</SelectItem>
//             <SelectItem value="price:desc">Price: High to Low</SelectItem>
//             <SelectItem value="name:asc">Name: Ascending</SelectItem>
//             <SelectItem value="name:desc">Name: Descending</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {loading ? (
//           <ProductCardSkeleton />
//         ) : (
//           products.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))
//         )}

//         {hasNextPage && (
//           <div ref={ref} className="h-10 flex items-center justify-center">
//             {loading ? "Loading more..." : "Scroll to load more"}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "./ProductCard";
import { productType } from "@/utils/types";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { useInView } from "react-intersection-observer";
import { useNuqsContext } from "@/context/use-nuqs-state";
import NoProducts from "./NoProducts";

interface ProductGridProps {
  products: productType[];
  loading?: boolean;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

const ProductGrid = memo(
  ({
    products,
    loading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }: ProductGridProps) => {
    const { sortOption, setSortOption, onSortClear } = useNuqsContext();

    const handleSortOption = (value: string | null) => {
      if (value === "all") {
        onSortClear?.();
      }
      setSortOption(value);
    };

    const { ref } = useInView({
      threshold: 1,
      onChange: (inView) => {
        if (inView && !isFetchingNextPage && hasNextPage) {
          fetchNextPage?.();
        }
      },
    });

    return (
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl font-bold">All Products</h2>

          <Select
            value={sortOption ?? undefined}
            onValueChange={handleSortOption}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="price:asc">Price: Low to High</SelectItem>
              <SelectItem value="price:desc">Price: High to Low</SelectItem>
              <SelectItem value="name:asc">Name: Ascending</SelectItem>
              <SelectItem value="name:desc">Name: Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <ProductCardSkeleton />
          ) : products.length === 0 ? (
            <NoProducts />
          ) : (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}

          {!loading && products.length > 0 && hasNextPage && (
            <div
              ref={ref}
              className="h-10 flex items-center justify-center col-span-full"
            >
              {loading ? "Loading more..." : "Scroll to load more"}
            </div>
          )}
        </div>
      </div>
    );
  }
);

// Provide a display name for better debugging
ProductGrid.displayName = "ProductGrid";

export default ProductGrid;
