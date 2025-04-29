"use client";

import MoreActionsOptions from "@/components/Options_action";
import formatCurrency from "@/utils/formatCurrency";

import { statusOptions } from "@/lib/constant/constant";
import dynamic from "next/dynamic";
import { useAdminOrders } from "@/services/productsServices/getAdminOrders";
import { Order } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useUpdateOrder } from "@/services/productsServices/updateOrder";
import LoadingSpinner from "../Loader";
import { useDeleteOrder } from "@/services/productsServices/deleteOrder";

const DataTable = dynamic(
  () => import("./Table").then((mod) => mod.DataTable),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

export default function OrderList() {
  const { data: orders } = useAdminOrders();
  const { mutate: updateOrder } = useUpdateOrder();
  const { mutate: deleteOrder } = useDeleteOrder();
  const router = useRouter();

  // Handle status change
  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    if (newStatus) {
      updateOrder({ id: orderId, status: newStatus });
    }
  };

  const handleViewDetails = (orderId: string) => {
    router.push(`/admin/order/${orderId}`);
  };

  // Handle delete
  const handleDelete = (orderId: string) => {
    if (orderId) {
      deleteOrder(orderId);
    }
    console.log("Deleting order with ID:", orderId);
  };

  // Format the data for display
  const formattedOrders = orders?.orders?.map((order, index) => ({
    ...order,
    index: index + 1,
    date: new Date(order.orderDate).toISOString().split("T")[0],
    total: formatCurrency(order.totalPrice),
  }));

  // Define columns
  const columns = [
    { header: "Number", key: "index", hideOnMobile: true },
    { header: "Customer", key: "customerName" },
    { header: "Date", key: "date", hideOnMobile: true },
    { header: "Total", key: "total" },
  ];

  return (
    <>
      <DataTable
        data={formattedOrders || []}
        columns={columns}
        title="Orders"
        idField="_id"
        statusField="status"
        statusOptions={statusOptions}
        onStatusChange={(id, newStatus) =>
          handleStatusChange(id, newStatus as Order["status"])
        }
        onDelete={handleDelete}
        viewDetails={handleViewDetails}
        ActionsComponent={MoreActionsOptions}
      />

      {/* <UserList /> */}
    </>
  );
}
