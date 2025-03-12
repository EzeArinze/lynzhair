import React from "react";
import { Skeleton } from "../ui/skeleton";

function CategorySkeleton() {
  return (
    <section className="max-w-[90vw] m-auto border-r-2 border-l-2 rounded-full px-2 py-2">
      <div className="flex  gap-2 overflow-x-auto hide-scrollbar whitespace-nowrap">
        {[...Array(3).keys()].map((keys) => (
          <Skeleton
            key={keys}
            className="h-9 w-32 rounded-md flex-shrink-0 px-4 md:py-1 mr-1"
          />
        ))}
      </div>
    </section>
  );
}

export default CategorySkeleton;
