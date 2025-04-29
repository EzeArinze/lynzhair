import { RecentOrderLimit } from "@/lib/constant/constant";
import { OrdersResponse } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAdminRecentOrders = () => {
  return useQuery<OrdersResponse>({
    queryKey: ["recentOrders"],
    queryFn: async () => {
      const { data } = await axios.get<OrdersResponse>(
        `/api/v1/orders/admin?recent=true&limit=${RecentOrderLimit}`
      );
      return data || [];
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useAdminOrders = () => {
  return useQuery<OrdersResponse>({
    queryKey: ["adminOrders"],
    queryFn: async () => {
      const { data } = await axios.get<OrdersResponse>(`/api/v1/orders/admin`);
      return data || [];
    },
    staleTime: 1000 * 60 * 30,
    // conditionally fetch if the user is authenticated
    // enabled: !!user,
  });
};
