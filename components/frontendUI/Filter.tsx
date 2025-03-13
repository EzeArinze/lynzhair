import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { FilterSidebarProps } from "@/utils/types";
import PredefinedRanges from "./PredefinedRanges";

export function FilterSidebar({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  className,
  onClearFilters,
}: FilterSidebarProps) {
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

  const handleApplyPriceRange = () => {
    setMinPrice(localMinPrice);
    setMaxPrice(localMaxPrice);
  };

  return (
    <div className={cn("w-full lg:w-72 shrink-0 sticky top-20", className)}>
      <div className=" bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>

        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="price"
        >
          <AccordionItem value="price">
            <AccordionTrigger className="text-sm font-medium">
              Price Range
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {/* Custom price range inputs */}
                <div className="flex items-center space-x-2">
                  <div className="flex-1 m-1">
                    <Input
                      type="number"
                      min="0"
                      placeholder="Min"
                      value={localMinPrice}
                      onChange={(e) => setLocalMinPrice(Number(e.target.value))}
                      className="pl-2"
                    />
                  </div>
                  <span className="text-gray-400">to</span>
                  <div className="flex-1 m-1">
                    <Input
                      type="number"
                      min="0"
                      placeholder="Max"
                      value={localMaxPrice}
                      onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
                      className="pl-2"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleApplyPriceRange}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white mt-2"
                >
                  Apply
                </Button>

                {/* Predefined price ranges */}

                <PredefinedRanges
                  setLocalMaxPrice={setLocalMaxPrice}
                  setLocalMinPrice={setLocalMinPrice}
                  localMaxPrice={localMaxPrice}
                  localMinPrice={localMinPrice}
                />

                {/* Current price range display */}
                <div className="text-sm text-gray-600 pt-2">
                  <p>
                    Current range:{" "}
                    <span className="font-medium">
                      N{localMinPrice} - N{localMaxPrice}{" "}
                      {/* implement price range */}
                    </span>
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button
          className="w-full mt-6 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white transition-colors"
          variant="outline"
          onClick={() => {
            setLocalMinPrice(0);
            setLocalMaxPrice(0);
            onClearFilters?.();
          }}
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );
}
