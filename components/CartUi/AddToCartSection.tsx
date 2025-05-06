import React from "react";
import { productType } from "@/utils/types";
import AddToCartButton from "./AddToCartButton";
import AddToFavorite from "../FavoriteUi/AddToFavorite";

interface addSectionType {
  product: productType;
}

function AddToCartSection({ product }: addSectionType) {
  return (
    <section className="space-y-4">
      {/* <div className="flex items-center space-x-4"> */}
      <div className="flex items-center border rounded-md space-x-2 p-1">
        <AddToCartButton product={product} />
        <div className="space-x-2 relative">
          <AddToFavorite product={product} noAbsolute={true} />
        </div>
      </div>
    </section>
  );
}

export default AddToCartSection;
