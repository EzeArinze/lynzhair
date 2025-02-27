"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import formatCurrency from "@/utils/formatCurrency";
import dummyOrder, { IOrder } from "@/utils/dummyOrder";
import getStatusColor from "@/lib/constant/getStatusColor";

export default function OrderList() {
  const [orders, setOrders] = useState<IOrder[]>(dummyOrder);
  console.log(dummyOrder);

  const handleStatusChange = (orderId: string, newStatus: IOrder["status"]) => {
    setOrders(
      orders.map((order) =>
        order.orderNumber === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="overflow-x-auto w-[90%] mx-auto h-full">
      <h1 className="text-3xl font-bold mb-6">Order</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden md:table-cell">Order ID</TableHead>
            <TableHead className=" md:table-cell">Customer</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className=" md:table-cell">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={order.orderNumber}>
              <TableCell className="hidden md:table-cell font-medium">
                {index + 1}
              </TableCell>
              <TableCell className=" md:table-cell">
                {order.customerName}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {order.orderDate.toISOString().split("T")[0]}
              </TableCell>
              <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
              <TableCell>
                <Select
                  value={order.status}
                  onValueChange={(value) =>
                    handleStatusChange(
                      order.orderNumber,
                      value as IOrder["status"]
                    )
                  }
                >
                  <SelectTrigger className="w-[120px] md:w-[180px]">
                    <SelectValue>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className=" md:table-cell">
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
