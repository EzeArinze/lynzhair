import React from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { productType } from "@/utils/types";
import { useFavoriteStore } from "@/store/favoriteStore";
import { useClient } from "@/hooks/isClient";

interface AddToFavoriteProps {
  product: productType;
  noAbsolute?: boolean;
}

function AddToFavorite({ product, noAbsolute = false }: AddToFavoriteProps) {
  const { isClient } = useClient();
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useFavoriteStore();

  if (!isClient) return null;

  const alreadExist = isFavorite(product._id);

  const favs = {
    id: product._id,
    name: product.name,
    image: product.images[0].public_url,
    price: product.price,
  };

  // Use the prop to conditionally apply the absolute positioning
  const positionClass = noAbsolute ? "" : "absolute top-2 right-2";

  return (
    <Button
      variant={"ghost"}
      size="icon"
      className={`${positionClass} bg-white/80 hover:bg-white rounded-full`}
      onClick={
        alreadExist
          ? () => removeFromFavorites(product._id)
          : () => addToFavorites(favs)
      }
    >
      <Heart
        fill={alreadExist ? "pink" : "none"}
        className="h-5 w-5 text-pink-600"
      />
    </Button>
  );
}

export default AddToFavorite;
