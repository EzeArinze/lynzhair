import { RecentOrderLimit } from "@/lib/constant/constant";
import { OrdersResponse } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type UseAdminOrdersOptions = {
  recent?: boolean;
  // enabled?: boolean;
  limit?: number;
};

export const useAdminOrdersOption = ({
  recent = false,
  // enabled = true,
  limit = RecentOrderLimit,
}: UseAdminOrdersOptions = {}) => {
  return useQuery<OrdersResponse>({
    queryKey: recent ? ["recentOrders", limit] : ["adminOrders"],
    queryFn: async () => {
      const url = recent
        ? `/api/v1/orders/admin?recent=true&limit=${limit}`
        : `/api/v1/orders/admin`;
      const { data } = await axios.get<OrdersResponse>(url);
      return data || [];
    },
    staleTime: recent ? 1000 * 60 * 5 : 1000 * 60 * 30,
    // enabled,
  });
};
