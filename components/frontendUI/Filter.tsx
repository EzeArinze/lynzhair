"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  // priceRange: number[]
  // setPriceRange: (value: number[]) => void
  onClearFilters: () => void;
  className?: string;
}

export function FilterSidebar({
  className,
  onClearFilters,
}: FilterSidebarProps) {
  // Handle price range application
  const handleApplyPriceRange = () => {
    onClearFilters?.();
  };

  // Predefined price ranges
  const priceRanges = [
    { label: "Under $100", min: 0, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 - $300", min: 200, max: 300 },
    { label: "Over $300", min: 300, max: 1000 },
  ];

  return (
    <div className={cn("w-full lg:w-64 shrink-0", className)}>
      <div className="sticky top-20 bg-white p-6 rounded-lg border">
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
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <Input
                      type="number"
                      min="0"
                      placeholder="Min"
                      className="pl-7"
                    />
                  </div>
                  <span className="text-gray-400">to</span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <Input
                      type="number"
                      min="0"
                      placeholder="Max"
                      className="pl-7"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleApplyPriceRange}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                >
                  Apply
                </Button>

                {/* Predefined price ranges */}
                <div className="pt-2 border-t">
                  <p className="text-sm font-medium mb-2">Quick Ranges</p>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => {}}
                        className={`text-sm w-full text-left py-1.5 px-2 rounded-md transition-colors ${
                          0 === range.min && 1 === range.max // check the range for the styling
                            ? "bg-pink-50 text-pink-600 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current price range display */}
                <div className="text-sm text-gray-600 pt-2">
                  <p>
                    Current range:{" "}
                    <span className="font-medium">
                      ${0} - ${1} {/* implement price range */}
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
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );
}
