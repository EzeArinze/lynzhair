import { RecentOrderLimit } from "@/lib/constant/constant";
import { OrdersResponse } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await axios.put(
        `/api/v1/orders/admin/update/${id}`,
        {
          status: status,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return response.data;
    },

    onMutate: async ({
      id,
      status,
    }: {
      id: string;
      status: string;
    }): Promise<{
      AdminOrders: OrdersResponse | undefined;
      RecentOrders: OrdersResponse | undefined;
    }> => {
      // Cancel both recent and all orders queries
      await queryClient.cancelQueries({
        queryKey: ["recentOrders", RecentOrderLimit],
      });
      await queryClient.cancelQueries({ queryKey: ["adminOrders"] });

      const AdminOrders = queryClient.getQueryData<OrdersResponse>([
        "adminOrders",
      ]);

      const RecentOrders = queryClient.getQueryData<OrdersResponse>([
        "recentOrders",
        RecentOrderLimit,
      ]);

      // Update both recent and all orders caches
      queryClient.setQueryData<OrdersResponse>(["adminOrders"], (oldData) => {
        if (!oldData) return undefined;
        return {
          ...oldData,
          orders: oldData.orders.map((order) =>
            order._id === id ? { ...order, status: status } : order
          ),
        };
      });

      queryClient.setQueryData<OrdersResponse>(
        ["recentOrders", RecentOrderLimit],
        (oldData) => {
          if (!oldData) return undefined;
          return {
            ...oldData,
            orders: oldData.orders.map((order) =>
              order._id === id ? { ...order, status: status } : order
            ),
          };
        }
      );

      return { AdminOrders, RecentOrders };
    },

    onSuccess: () => {
      toast.success("Order Updated");
    },

    onError: (error, _, context) => {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      toast.error(errorMessage || "Failed to update product.");

      if (context?.AdminOrders) {
        queryClient.setQueryData(["adminOrders"], context.AdminOrders);
      }

      if (context?.RecentOrders) {
        queryClient.setQueryData(
          ["recentOrders", RecentOrderLimit],
          context.RecentOrders
        );
      }
    },
  });
};
