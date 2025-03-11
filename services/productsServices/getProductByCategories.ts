import { productType } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getProductByCategories = async (category: string) => {
  try {
    const productByCategories = await axios.get<productType>(
      `/api/v1/products-categories?category=${category}`
    );
    return productByCategories.data || [];
  } catch (error) {
    console.log(error);
  }
};

export const useGetProductByCategories = (category: string) => {
  return useQuery({
    queryKey: ["categoryProduct", category],
    queryFn: () => getProductByCategories(category),
    staleTime: 20 * 60 * 1000,
  });
};
