import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import useBasketStore from "@/store/cartStore";
import { productType } from "@/utils/types";
import { Trash } from "lucide-react";

type ProductCardProps = {
  product: productType | undefined;
};

function AddToCartButton({ product }: ProductCardProps) {
  const { addItem, items, removeItem } = useBasketStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const alreadExist = product
    ? items.find((item) => item.product._id === product._id)
    : undefined;

  if (!isClient) return null;

  return !!alreadExist ? (
    <Button
      className="flex-1 bg-white border border-pink-600 hover:bg-pink-700 text-pink-600 hover:text-white "
      onClick={() => product && removeItem(product._id)}
      asChild
    >
      <span className="cursor-pointer">
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
