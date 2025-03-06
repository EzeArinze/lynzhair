// Purpose: Service to get all products from the database.
import { ProductTypes } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const getProducts = async () => {
  try {
    const productdata = await axios.get("/api/getProducts");
    return productdata.data as Omit<ProductTypes, "id">[];
  } catch (err: unknown) {
    console.log(AxiosError.ERR_BAD_REQUEST, err);

    return [];
  }
};

export default getProducts;

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};
