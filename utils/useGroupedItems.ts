import { useClient } from "@/hooks/isClient";
import useBasketStore from "@/store/cartStore";

export function useGroupedItems() {
  const getGroupedItem = useBasketStore((state) => state.getGroupedItem());

  const { isClient } = useClient();

  if (!isClient) return null;

  return getGroupedItem;
}
