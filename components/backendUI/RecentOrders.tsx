import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { useAdminRecentOrders } from "@/services/productsServices/getAdminOrders";
import RecentOrderState from "./RecentOrderState";
import formatCurrency from "@/utils/formatCurrency";
import { Badge } from "../ui/badge";
import getStatusColor from "@/utils/getStatusColor";
import { RecentOrder } from "@/utils/types";

interface recentTypes {
  recentOrder: RecentOrder[] | undefined;
  isFetching: boolean;
  Error: boolean;
}

export default function RecentOrders({
  recentOrder,
  isFetching,
  Error,
}: recentTypes) {
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
                <TableHead className="w-[100px]">Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <RecentOrderState
              isError={Error}
              isFetching={isFetching}
              length={recentOrder?.length || 0}
            />
            <TableBody>
              {recentOrder?.map((order) => (
                <TableRow key={order.orderNumber}>
                  <TableCell className="font-medium">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell className=" sm:table-cell">
                    {order.customerName}
                  </TableCell>
                  <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                  <TableCell className="text-right">
                    {/* {getStatusBadge(order.status)} */}
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
