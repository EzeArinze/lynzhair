// Purpose: Service to get all products from the database.
import { ProductTypes } from "@/utils/types";
import axios from "axios";

const getProducts = async () => {
  try {
    const productdata = await axios.get("/api/getProducts");
    return productdata.data as Omit<ProductTypes, "id">[];
  } catch (err: unknown) {
    console.error(err);
    return [];
  }
};

export default getProducts;
