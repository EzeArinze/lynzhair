import { productType } from "@/utils/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

type getCommerceProductProps = {
  pageParam?: number;
  queryParams: string;
};

interface PageResponse {
  products: productType[];
  page?: number; // Next page number or undefined
}

const getCommerceProduct = async ({
  pageParam = 0,
  queryParams,
}: getCommerceProductProps): Promise<PageResponse> => {
  try {
    const { data } = await axios.get<PageResponse>(
      `/api/v1/products?${queryParams}&page=${pageParam}`
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching products");
  }
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
