import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "./ProductCard";
import { productType } from "@/utils/types";

interface ProductGridProps {
  products: productType[];
  sortOption: string | null;
  setSortOption: (value: string | null) => Promise<URLSearchParams>;
  clearState: () => void;
}

export function ProductGrid({
  products,
  sortOption,
  setSortOption,
  clearState,
}: ProductGridProps) {
  const handleSortOption = (value: string | null) => {
    if (value === "all") {
      clearState?.();
    }
    setSortOption(value);
  };

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
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
