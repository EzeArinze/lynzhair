// import { BASE_URL } from "@/lib/constant/env";
import { useQuery } from "@tanstack/react-query";
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
