import React from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { productType } from "@/utils/types";
import AddToCartButton from "./AddToCartButton";

interface addSectionType {
  product: productType | undefined;
}

function AddToCartSection({ product }: addSectionType) {
  return (
    <section className="space-y-4">
      {/* <div className="flex items-center space-x-4"> */}
      <div className="flex items-center border rounded-md space-x-2 p-1">
        <AddToCartButton product={product} />
        <div className="space-x-2">
          <Button variant="outline" size="icon" className="rounded-md">
            <Heart className="w-5 h-5 text-pink-600" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
      </div>

      {/* <Button
        variant="outline"
        className="w-full border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
      >
        Buy Now
      </Button> */}
    </section>
  );
}

export default AddToCartSection;
