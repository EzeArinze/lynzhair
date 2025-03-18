// "use client";

// import { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import formatCurrency from "@/utils/formatCurrency";
// import dummyOrder, { IOrder } from "@/utils/dummyOrder";
// import getStatusColor from "@/lib/constant/getStatusColor";
// import MoreActionsOptions from "../Options_action";

// export default function OrderList() {
//   const [orders, setOrders] = useState<IOrder[]>(dummyOrder);

//   const handleStatusChange = (orderId: string, newStatus: IOrder["status"]) => {
//     setOrders(
//       orders.map((order) =>
//         order.orderNumber === orderId ? { ...order, status: newStatus } : order
//       )
//     );
//   };

//   const handleDelete = (orderId: string) => {
//     setOrders(orders.filter((order) => order.orderNumber !== orderId));
//   };

//   return (
//     <div className="overflow-x-auto w-[90%] mx-auto h-full">
//       <h1 className="text-3xl font-bold mb-6">Order</h1>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="hidden md:table-cell">Order ID</TableHead>
//             <TableHead className=" md:table-cell">Customer</TableHead>
//             <TableHead className="hidden md:table-cell">Date</TableHead>
//             <TableHead>Total</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead className=" md:table-cell">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {orders.map((order, index) => (
//             <TableRow key={order.orderNumber}>
//               <TableCell className="hidden md:table-cell font-medium">
//                 {index + 1}
//               </TableCell>
//               <TableCell className=" md:table-cell">
//                 {order.customerName}
//               </TableCell>
//               <TableCell className="hidden md:table-cell">
//                 {order.orderDate.toISOString().split("T")[0]}
//               </TableCell>
//               <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
//               <TableCell>
//                 <Select
//                   value={order.status}
//                   onValueChange={(value) =>
//                     handleStatusChange(
//                       order.orderNumber,
//                       value as IOrder["status"]
//                     )
//                   }
//                 >
//                   <SelectTrigger className="w-[120px] md:w-[180px]">
//                     <SelectValue>
//                       <Badge className={getStatusColor(order.status)}>
//                         {order.status}
//                       </Badge>
//                     </SelectValue>
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="pending">Pending</SelectItem>
//                     <SelectItem value="Processing">Processing</SelectItem>
//                     <SelectItem value="Shipped">Shipped</SelectItem>
//                     <SelectItem value="Completed">Completed</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </TableCell>
//               <TableCell className=" md:table-cell">
//                 <MoreActionsOptions
//                   Id={order.orderNumber}
//                   onDelete={handleDelete}
//                 />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

"use client";

import { useState } from "react";

import MoreActionsOptions from "@/components/Options_action";
import formatCurrency from "@/utils/formatCurrency";
import dummyOrder, { IOrder } from "@/utils/dummyOrder";
// import { DataTable } from "./Table";
import { statusOptions } from "@/lib/constant/conatant";
import dynamic from "next/dynamic";
// import UserList from "./UserList";
const DataTable = dynamic(
  () => import("./Table").then((mod) => mod.DataTable),
  {
    ssr: false,
  }
);

export default function OrderList() {
  const [orders, setOrders] = useState(dummyOrder);

  // Handle status change
  const handleStatusChange = (orderId: string, newStatus: IOrder["status"]) => {
    setOrders(
      orders.map((order) =>
        order.orderNumber === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Handle delete
  const handleDelete = (orderId: string) => {
    setOrders(orders.filter((order) => order.orderNumber !== orderId));
  };

  // Format the data for display
  const formattedOrders = orders.map((order, index) => ({
    ...order,
    index: index + 1,
    date: order.orderDate.toISOString().split("T")[0],
    total: formatCurrency(order.totalPrice),
  }));

  // Define columns
  const columns = [
    { header: "Order ID", key: "index", hideOnMobile: true },
    { header: "Customer", key: "customerName" },
    { header: "Date", key: "date", hideOnMobile: true },
    { header: "Total", key: "total" },
  ];

  return (
    <>
      <DataTable
        data={formattedOrders}
        columns={columns}
        title="Orders"
        idField="orderNumber"
        statusField="status"
        statusOptions={statusOptions}
        onStatusChange={(id, newStatus) =>
          handleStatusChange(id, newStatus as IOrder["status"])
        }
        onDelete={handleDelete}
        ActionsComponent={MoreActionsOptions}
      />

      {/* <UserList /> */}
    </>
  );
}
