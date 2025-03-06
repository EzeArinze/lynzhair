"use client";

import { Button } from "@/components/ui/button";
import { dummy_categories } from "@/lib/constant/categories";
import { cn } from "@/lib/utils";
import { useGetCategories } from "@/services/productsServices/getCategories";
import { useState } from "react";

interface HairCategorySelectorProps {
  onSelect?: (length: string) => void;
  defaultValue?: string;
}

export default function HairCategorySelector({
  onSelect,
  defaultValue = "All",
}: HairCategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState(defaultValue);

  const { data: categories, isFetching } = useGetCategories();

  const newCategories =
    !Array.isArray(categories) || categories.length === 0
      ? dummy_categories
      : categories;

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    onSelect?.(category);
  };

  return isFetching ? (
    <p className="text-center">categories loading...</p>
  ) : (
    <div className="max-w-[90vw] m-auto border-r-2 border-l-2 rounded-full px-2 py-2">
      <div className="flex  gap-2 overflow-x-auto hide-scrollbar whitespace-nowrap">
        {newCategories?.map((category: string) => (
          <Button
            key={category}
            variant="outline"
            className={cn(
              "rounded-full hover:bg-muted flex-shrink-0 px-4 md:py-1 mr-1",
              selectedCategory === category && "border-2 border-primary"
            )}
            onClick={() => handleSelect(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
