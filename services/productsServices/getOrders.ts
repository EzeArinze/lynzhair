import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//Getting the user orders
const getOrders = async () => {
  try {
    const { data } = await axios.get("/api/v1/orders/users");
    return data || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error; // Let React Query handle the error
  }
};

export const useGetOrder = () => {
  const {
    data: orderData,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    staleTime: 1000 * 60 * 40, // 40 minutes
    //Add enable later Only fetch if the user is authenticated
  });

  return { orderData, isFetching, error };
};

// Getting the Order details by id
const getOrderById = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/v1/orders/${id}`);
    return data || [];
  } catch (error) {
    console.error(`Error fetching order details for ID ${id}:`, error);
    throw error; // Let React Query handle the error
  }
};

export const useGetOrderDetails = (id: string) => {
  const {
    data: orderDetails,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["orderDetails", id],
    queryFn: () => getOrderById(id),
    staleTime: 1000 * 60 * 40,
    //Add enable later Only fetch if the user is authenticated
  });

  return { orderDetails, error, isFetching };
};
