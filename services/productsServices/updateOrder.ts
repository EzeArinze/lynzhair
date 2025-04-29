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
      previousRecentOrders: OrdersResponse | undefined;
      previousAdminOrders: OrdersResponse | undefined;
    }> => {
      await queryClient.cancelQueries({ queryKey: ["recentOrders"] });
      await queryClient.cancelQueries({ queryKey: ["adminOrders"] });

      const previousRecentOrders = queryClient.getQueryData<OrdersResponse>([
        "recentOrders",
      ]);
      const previousAdminOrders = queryClient.getQueryData<OrdersResponse>([
        "adminOrders",
      ]);

      queryClient.setQueryData<OrdersResponse>(["recentOrders"], (oldData) => {
        if (!oldData) return undefined;
        return {
          ...oldData,
          orders: oldData.orders.map((order) =>
            order._id === id
              ? { ...order, status: status } // Update the status directly
              : order
          ),
        };
      });

      queryClient.setQueryData<OrdersResponse>(["adminOrders"], (oldData) => {
        if (!oldData) return undefined;
        return {
          ...oldData,
          orders: oldData.orders.map((order) =>
            order._id === id ? { ...order, status: status } : order
          ),
        };
      });

      return { previousRecentOrders, previousAdminOrders };
    },

    onSuccess: () => {
      toast.success("Order Updated");
    },

    onError: (error, _, context) => {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      toast.error(errorMessage || "Failed to update product.");

      if (context?.previousRecentOrders) {
        queryClient.setQueryData(
          ["recentOrders"],
          context.previousRecentOrders
        );
      }

      if (context?.previousAdminOrders) {
        queryClient.setQueryData(["adminOrders"], context.previousAdminOrders);
      }
    },
  });
};
