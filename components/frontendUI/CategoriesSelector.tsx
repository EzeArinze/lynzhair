// "use client";

// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { useState } from "react";

// interface HairCategorySelectorProps {
//   onSelect?: (length: string) => void;
//   defaultValue?: string;
// }

// export default function HairCategorySelector({
//   onSelect,
//   defaultValue = "",
// }: HairCategorySelectorProps) {
//   const [selectedCategory, setSelectedCategory] = useState(defaultValue);

//   const categories = [
//     "Straight hair",
//     "Wavy hair",
//     "Curly hair",
//     "Coily hair",
//     "Afro-textured hair",
//     "Wigs",
//     "Brazilian hair",
//     "Peruvian hair",
//     "Indian hair",
//     "Malaysian hair",
//     "Closure & Frontals",
//   ];

//   const handleSelect = (category: string) => {
//     setSelectedCategory(category);
//     onSelect?.(category);
//   };

//   return (
//     <div className="w-[90%] max-w-full m-auto border-r-2 border-l-2 rounded-full pr-2 pl-2">
//       {/* <h3 className="mb-3 text-sm font-medium">Hair Length:</h3> */}
//       <div className="flex gap-2 overflow-auto hide-scrollbar">
//         {categories.map((category) => (
//           <Button
//             key={category}
//             variant="outline"
//             className={cn(
//               "rounded-full hover:bg-muted",
//               selectedCategory === category && "border-2 border-primary"
//             )}
//             onClick={() => handleSelect(category)}
//           >
//             {category}
//           </Button>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

  const categories = [
    "All",
    "Straight hair",
    "Wavy hair",
    "Curly hair",
    "Coily hair",
    "Afro-textured hair",
    "Wigs",
    "Brazilian hair",
    "Peruvian hair",
    "Indian hair",
    "Malaysian hair",
    "Closure & Frontals",
  ];

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    onSelect?.(category);
  };

  return (
    <div className="max-w-[90vw] m-auto border-r-2 border-l-2 rounded-full px-2 py-2">
      <div className="flex  gap-2 overflow-x-auto hide-scrollbar whitespace-nowrap">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            className={cn(
              "rounded-full hover:bg-muted flex-shrink-0 px-4  md:py-1",
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
