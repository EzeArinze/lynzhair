import { useFavoriteStore } from "@/store/favoriteStore";
import { FolderHeart, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import formatCurrency from "@/utils/formatCurrency";
import Link from "next/link";
import Image from "next/image";

function Favorites() {
  const [isOpen, setIsOpen] = useState(false);
  const { getFavorites, clearFavorites, removeFromFavorites } =
    useFavoriteStore();
  const wishList = getFavorites();

  const length = wishList.length;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-md">
          <FolderHeart
            className={`w-5 h-5 ${length > 0 ? "text-pink-500" : ""}`}
          />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[260px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle>Wishlist</SheetTitle>
          <SheetDescription hidden>wishlist menu</SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          {wishList?.length === 0 ? (
            <div className="text-center text-gray-500">Empty</div>
          ) : (
            <div className="space-y-4">
              {wishList?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    height={45}
                    width={45}
                    className="object-cover object-center rounded-md w-auto h-auto"
                  />
                  <Link
                    href={`/commerce/product-detail/${item.id}`}
                    className="flex-1"
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className=" text-gray-500 text-xs">
                      {formatCurrency(item.price)}
                    </p>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromFavorites(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              ))}
              <div className="text-center mt-4">
                <Button
                  variant="outline"
                  onClick={clearFavorites}
                  className="w-full text-red-500 hover:bg-red-100"
                >
                  Clear
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Favorites;
