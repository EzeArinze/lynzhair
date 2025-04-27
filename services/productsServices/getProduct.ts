// Purpose: Service to get all products from the database.
import { ProductTypes } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getProducts = async () => {
  const productdata = await axios.get("/api/v2/getProducts");
  return productdata.data as Omit<ProductTypes, "id">[];
};

export default getProducts;

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000,
  });
};
