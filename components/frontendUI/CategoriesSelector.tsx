"use client";

import { Button } from "@/components/ui/button";
import { dummy_categories } from "@/lib/constant/categories";
import { cn } from "@/lib/utils";
import { useGetCategories } from "@/services/productsServices/getCategories";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CategorySkeleton from "./CategorySkeleton";

interface HairCategorySelectorProps {
  onSelect?: (length: string) => void;
  defaultValue?: string;
}

export default function HairCategorySelector({
  onSelect,
  defaultValue = "All",
}: HairCategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState(defaultValue);

  const router = useRouter();
  const { data: categories, isFetching } = useGetCategories();

  const newCategories = categories ?? dummy_categories;

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    onSelect?.(category);

    if (!category) return;

    router.push(`/commerce/categories-page?category=${category}`);
  };

  return isFetching ? (
    <CategorySkeleton />
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
