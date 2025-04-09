// import { BASE_URL } from "@/lib/constant/env";
import { useQuery } from "@tanstack/react-query";
import { productType } from "@/utils/types";
import axios from "axios";

const getCategories = async () => {
  const { data } = await axios.get(`/api/v1/categories`);
  return data.categories || [];
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    retry: 1, // Optional: Retry once before failing
    staleTime: 40 * 60 * 1000,
  });
};

// Getting Product by categories
const getProductByCategories = async (category: string) => {
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
