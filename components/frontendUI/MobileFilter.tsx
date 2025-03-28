import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterSidebar } from "./Filter";
import { useNuqsContext } from "@/context/use-nuqs-state";

export function MobileFilters() {
  const { onClearPrice, maxPrice, minPrice, setMaxPrice, setMinPrice } =
    useNuqsContext();

  const getActiveFiltersCount = () => {
    let count = 0;
    if (minPrice > 0 || maxPrice < 1000) count++;
    return count;
  };

  const activeFilter = getActiveFiltersCount();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden relative">
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {activeFilter > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-pink-600 text-white text-xs flex items-center justify-center">
              {activeFilter}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[80%] sm:w-[380px] px-4">
        <SheetHeader>
          <SheetTitle className="text-left text-lg font-semibold text-pink-600">
            Filters
          </SheetTitle>
          <SheetDescription hidden></SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <FilterSidebar
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            onClearFilters={onClearPrice}
            className="w-full shadow-none border-0 p-0"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
