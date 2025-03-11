import { BASE_URL } from "@/lib/constant/env";
import { DetailsType } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getProductDetails = async (productId: string) => {
  const { data } = await axios.get(`${BASE_URL}/api/v1/product/${productId}`);
  return (data as DetailsType) || {};
};

const useGetProductDetails = (productId: string) => {
  return useQuery<DetailsType>({
    queryKey: ["details", productId],
    queryFn: async () => {
      const response = await axios.get(`/api/v1/product/${productId}`);
      return response.data as DetailsType;
    },
    staleTime: 1000 * 60 * 24,
  });
};

export default useGetProductDetails;
