import useBasketStore from "@/store/cartStore";
import { useEffect, useState } from "react";

export function useGroupedItems() {
  const getGroupedItem = useBasketStore((state) => state.getGroupedItem());

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return getGroupedItem;
}
