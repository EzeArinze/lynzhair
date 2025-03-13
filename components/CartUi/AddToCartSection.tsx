import React from "react";
import { Button } from "../ui/button";
import { Heart, Minus, Plus } from "lucide-react";
import { productType } from "@/utils/types";
import AddToCartButton from "./AddToCartButton";

interface addSectionType {
  product: productType | undefined;
}

function AddToCartSection({ product }: addSectionType) {
  return (
    <section className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center border rounded-md space-x-2">
          <button
            onClick={() => {}}
            className="px-3 py-2 text-gray-600 hover:text-pink-600 disabled:opacity-50"
            disabled={1 <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-3 py-2 text-center w-12">{1}</span>
          <button
            onClick={() => {}}
            className="px-3 py-2 text-gray-600 hover:text-pink-600"
          >
            <Plus className="w-4 h-4" />
          </button>
          <AddToCartButton product={product} />
        </div>

        <div className="space-x-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <Heart className="w-5 h-5 text-pink-600" />
            <span className="sr-only">Add to wishlist</span>
          </Button>

          {/* <Button variant="outline" size="icon" className="rounded-full">
            <Share2 className="w-5 h-5" />
            <span className="sr-only">Share product</span>
          </Button> */}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"
      >
        Buy Now
      </Button>
    </section>
  );
}

export default AddToCartSection;
