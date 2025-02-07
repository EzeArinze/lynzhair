import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const recentOrders = [
  { id: "1", customer: "John Doe", total: "$120.00", status: "Completed" },
  { id: "2", customer: "Jane Smith", total: "$85.50", status: "Processing" },
  { id: "3", customer: "Bob Johnson", total: "$200.00", status: "Shipped" },
  { id: "4", customer: "Alice Brown", total: "$75.25", status: "Pending" },
  { id: "5", customer: "Charlie Davis", total: "$150.75", status: "Completed" },
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

export default function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell className=" sm:table-cell">
                    {order.customer}
                  </TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell className="text-right">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
