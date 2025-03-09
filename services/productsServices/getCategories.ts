import { BASE_URL } from "@/lib/constant/env";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getCategories = async () => {
  try {
    const categories = await axios.get(`${BASE_URL}/api/v1/categories`);
    return categories.data.categories || [];
  } catch (error) {
    console.log(error);
    throw new Error("Faild to fetch categories");
  }
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
