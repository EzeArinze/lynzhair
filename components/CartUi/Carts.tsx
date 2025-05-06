import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useGroupedItems } from "@/utils/useGroupedItems";

function Carts() {
  const getGrouped = useGroupedItems();

  return (
    <Button variant="ghost" size="icon" className="relative" asChild>
      <Link href={"/commerce/cart"}>
        <ShoppingCart className="h-5 w-5" />
        <span
          className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full ${
            getGrouped?.length === 0
              ? ""
              : "bg-primary text-[10px] font-medium text-white shadow-md"
          } `}
        >
          {getGrouped?.length || ""}
        </span>
      </Link>
    </Button>
  );
}

export default Carts;
