import { productType } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getSearchResult = async (query: string) => {
  try {
    const searchResult = await axios.get<productType[]>(
      `/api/v1/search?query=${query}`
    );
    return searchResult.data || [];
  } catch (error) {
    console.log(error);
  }
};

export const useGetSearchResult = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => getSearchResult(query),
    staleTime: 15 * 60 * 1000,
  });
};
