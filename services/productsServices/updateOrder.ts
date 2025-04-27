// import { RecentOrder } from "@/utils/types";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { toast } from "sonner";

// export const useUpdateOrder = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (orderData: RecentOrder) => {
//       const response = await axios.put(
//         `/api/v1/orders/admin/update/${orderData._id}`,
//         { status: orderData.status },
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       return response.data;
//     },

//     onMutate: async (orderData) => {
//       await queryClient.cancelQueries({
//         queryKey: ["recentOrders", "adminOrders"],
//       });

//       const previousOrderData = queryClient.getQueryData<RecentOrder[]>([
//         "adminOrders",
//         "recentOrders",
//       ]);

//       queryClient.setQueryData<RecentOrder[]>(
//         ["adminOrders", "recentOrders"],
//         (oldData) => {
//           if (!oldData) return [];

//           return oldData.map((order) =>
//             order._id === orderData._id
//               ? {
//                   ...order,
//                   status: orderData.status,
//                 }
//               : order
//           );
//         }
//       );

//       return { previousOrderData };
//     },

//     onSuccess: () => {
//       toast.success("Order Updated");
//     },

//     onError: (error, _, context) => {
//       console.error("Error updating product:", error.message);
//       toast.error("Failed to update product.");

//       // Rollback in case of an error
//       if (context?.previousOrderData) {
//         queryClient.setQueryData(
//           ["adminOrders", "recentOrders"],
//           context.previousOrderData
//         );
//       }
//     },
//   });
// };

import { RecentOrder } from "@/utils/types";
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
      previousRecentOrders: RecentOrder[] | undefined;
      previousAdminOrders: RecentOrder[] | undefined;
    }> => {
      await queryClient.cancelQueries({ queryKey: ["recentOrders"] });
      await queryClient.cancelQueries({ queryKey: ["adminOrders"] });

      const previousRecentOrders = queryClient.getQueryData<RecentOrder[]>([
        "recentOrders",
      ]);
      const previousAdminOrders = queryClient.getQueryData<RecentOrder[]>([
        "adminOrders",
      ]);

      queryClient.setQueryData<RecentOrder[]>(["recentOrders"], (oldData) => {
        if (!oldData) return [];
        return oldData.map((order) =>
          order._id === id
            ? { ...order, status: status } // Update the status directly
            : order
        );
      });

      queryClient.setQueryData<RecentOrder[]>(["adminOrders"], (oldData) => {
        if (!oldData) return [];
        return oldData.map((order) =>
          order._id === id ? { ...order, status: status } : order
        );
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
