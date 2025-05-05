import React from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { productType } from "@/utils/types";
import { useFavoriteStore } from "@/store/favoriteStore";
import { useClient } from "@/hooks/isClient";

interface AddToFavoriteProps {
  product: productType;
}

function AddToFavorite({ product }: AddToFavoriteProps) {
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

  return alreadExist ? (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
      onClick={() => removeFromFavorites(product._id)}
    >
      <Heart fill="pink" className="h-5 w-5 text-pink-600" />
    </Button>
  ) : (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
      onClick={() => addToFavorites(favs)}
    >
      <Heart className="h-5 w-5 text-pink-600" />
    </Button>
  );
}

export default AddToFavorite;
