import { Badge } from "@/components/ui/badge";

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "processing":
      return <Badge className="bg-blue-500">Processing</Badge>;
    case "shipped":
      return <Badge className="bg-purple-500">Shipped</Badge>;
    case "delivered":
      return <Badge className="bg-green-500">Delivered</Badge>;
    case "cancelled":
      return <Badge className="bg-red-500">Cancelled</Badge>;
    default:
      return <Badge className="bg-gray-500">Unknown</Badge>;
  }
};
