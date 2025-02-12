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
import formatCurrency from "@/lib/formatCurrency";

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: string;
}

const initialOrders: Order[] = [
  {
    id: "1",
    customer: "John Doe",
    date: "2023-06-01",
    total: 120.0,
    status: "Completed",
  },
  {
    id: "2",
    customer: "Jane Smith",
    date: "2023-06-02",
    total: 85.5,
    status: "Processing",
  },
  {
    id: "3",
    customer: "Bob Johnson",
    date: "2023-06-03",
    total: 200.0,
    status: "Shipped",
  },
  {
    id: "4",
    customer: "Alice Brown",
    date: "2023-06-04",
    total: 75.25,
    status: "Pending",
  },
  {
    id: "5",
    customer: "Charlie Davis",
    date: "2023-06-05",
    total: 150.75,
    status: "Completed",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800";
    case "Processing":
      return "bg-blue-100 text-blue-800";
    case "Shipped":
      return "bg-purple-100 text-purple-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
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
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="hidden md:table-cell font-medium">
                {order.id}
              </TableCell>
              <TableCell className=" md:table-cell">{order.customer}</TableCell>
              <TableCell className="hidden md:table-cell">
                {order.date}
              </TableCell>
              <TableCell>{formatCurrency(order.total)}</TableCell>
              <TableCell>
                <Select
                  value={order.status}
                  onValueChange={(value) => handleStatusChange(order.id, value)}
                >
                  <SelectTrigger className="w-[120px] md:w-[180px]">
                    <SelectValue>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
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
