import { useFavoriteStore } from "@/store/favoriteStore";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Modal } from "../Modal";

function Favorites() {
  const [isOpen, setIsOpen] = useState(false);
  const wishList = useFavoriteStore((state) => state.getFavorites());

  console.log(wishList);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-md"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Heart className="w-5 h-5 text-pink-600" />
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen((prev) => !prev)}
        title="Wishlist"
      >
        My Wish List
      </Modal>
    </>
  );
}

export default Favorites;
