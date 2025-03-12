import { useSearchParams } from "next/navigation";

export function useSearchParamsValues() {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const sort = params.sort;
  const minPriceParam = parseInt(params.minPrice);
  const maxPriceParam = parseInt(params.maxPrice);

  return { sort, minPriceParam, maxPriceParam };
}
