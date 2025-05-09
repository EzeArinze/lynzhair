import { BASE_URL } from "@/lib/constant/env";
import { productType } from "@/utils/types";
// import { DetailsType } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getProductDetails = async (productId: string) => {
  const { data } = await axios.get(`${BASE_URL}/api/v1/product/${productId}`);
  return (data as productType) || {};
};

const useGetProductDetails = (productId: string) => {
  return useQuery<productType>({
    queryKey: ["details", productId],
    queryFn: async () => {
      const response = await axios.get(`/api/v1/product/${productId}`);
      return response.data as productType;
    },
    staleTime: 25 * 60 * 1000,
  });
};

export default useGetProductDetails;
