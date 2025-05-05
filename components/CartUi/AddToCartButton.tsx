import React from "react";
import { Button } from "../ui/button";
import useBasketStore from "@/store/cartStore";
import { productType } from "@/utils/types";
import { Trash } from "lucide-react";
import { useClient } from "@/hooks/isClient";

type ProductCardProps = {
  product: productType | undefined;
};

function AddToCartButton({ product }: ProductCardProps) {
  const { addItem, items, removeItem } = useBasketStore();

  const { isClient } = useClient();

  if (!isClient) return null;

  const alreadExist = product
    ? items.find((item) => item.product._id === product._id)
    : undefined;

  return !!alreadExist ? (
    <Button
      className="flex-1 bg-white border border-pink-600 hover:bg-pink-700 text-pink-600 hover:text-white w-full"
      onClick={() => product && removeItem(product._id)}
      asChild
    >
      <span className="cursor-pointer">
        Remove from cart
        <Trash />
      </span>
    </Button>
  ) : (
    <Button
      className="flex-1 bg-pink-600 hover:bg-pink-700 text-white w-full"
      onClick={() => product && addItem(product)}
    >
      Add to Cart
    </Button>
  );
}

export default AddToCartButton;
