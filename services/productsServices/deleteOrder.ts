import { OrdersResponse } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/v1/orders/admin/deleteOrder/${id}`);
      return id;
    },

    onMutate: async (
      id: string
    ): Promise<{
      previousRecentOrders: OrdersResponse | undefined;
      previousAdminOrders: OrdersResponse | undefined;
    }> => {
      await queryClient.cancelQueries({ queryKey: ["adminOrders"] });
      await queryClient.cancelQueries({ queryKey: ["recentOrders"] });

      const previousAdminOrders = queryClient.getQueryData<OrdersResponse>([
        "adminOrders",
      ]);
      const previousRecentOrders = queryClient.getQueryData<OrdersResponse>([
        "recentOrders",
      ]);

      queryClient.setQueryData<OrdersResponse>(["adminOrders"], (oldData) => {
        return oldData
          ? {
              ...oldData,
              orders: oldData.orders.filter((data) => data._id !== id),
            }
          : undefined;
      });

      queryClient.setQueryData<OrdersResponse>(["recentOrders"], (oldData) => {
        return oldData
          ? {
              ...oldData,
              orders: oldData.orders.filter((data) => data._id !== id),
            }
          : undefined;
      });

      return { previousAdminOrders, previousRecentOrders };
    },

    onSuccess: () => {
      toast.success("Order deleted successfully");
    },

    onError: (error, _, context) => {
      console.log(
        error instanceof Error ? error.message : "Faild to delete order"
      );
      toast.error("Order faild to delete");

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
