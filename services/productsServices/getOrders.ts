import { Order, OrderDetail } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetOrder = () => {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await axios.get<Order[]>("/api/v1/orders/users");
      return data || [];
    },
    staleTime: 1000 * 60 * 40, // 40 minutes
  });
};

// Getting the Order details by id

export const useGetOrderDetails = (id: string) => {
  return useQuery<OrderDetail>({
    queryKey: ["orderDetails", id],
    queryFn: async () => {
      const { data } = await axios.get<OrderDetail>(`/api/v1/orders/${id}`);
      return data || [];
    },
    staleTime: 1000 * 60 * 40,
    //Add enable later Only fetch if the user is authenticated
  });
};
