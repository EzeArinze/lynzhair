import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

type getCommerceProductProps = {
  pageParam?: number;
  queryParams: string;
};

const getCommerceProduct = async ({
  pageParam = 0,
  queryParams,
}: getCommerceProductProps) => {
  const { data } = await axios.get(
    `/api/products?${queryParams}&page=${pageParam}`
  );
  return data;
};

export const useGetCommerceProduct = (
  minPrice?: number,
  maxPrice?: number,
  sort?: string
) => {
  const queryParams = new URLSearchParams();

  if (minPrice) queryParams.append("minPrice", minPrice.toString());
  if (maxPrice) queryParams.append("maxPrice", maxPrice.toString());
  if (sort) queryParams.append("sort", sort);

  return useInfiniteQuery({
    queryKey: ["products", minPrice, maxPrice, sort],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) =>
      getCommerceProduct({ pageParam, queryParams: queryParams.toString() }),
    getNextPageParam: (lastPage: { page?: number }) =>
      lastPage.page ?? undefined,
  });
};
