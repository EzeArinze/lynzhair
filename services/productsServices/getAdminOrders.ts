import { RecentOrderLimit } from "@/lib/constant/constant";
import { RecentOrder } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAdminRecentOrders = () => {
  return useQuery<RecentOrder[]>({
    queryKey: ["recentOrders"],
    queryFn: async () => {
      const { data } = await axios.get<RecentOrder[]>(
        `/api/v1/orders/admin?recent=true&limit=${RecentOrderLimit}`
      );
      return data || [];
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useAdminOrders = () => {
  return useQuery<RecentOrder[]>({
    queryKey: ["adminOrders"],
    queryFn: async () => {
      const { data } = await axios.get<RecentOrder[]>(`/api/v1/orders/admin`);
      return data || [];
    },
    staleTime: 1000 * 60 * 30,
    // conditionally fetch if the user is authenticated
    // enabled: !!user,
  });
};
