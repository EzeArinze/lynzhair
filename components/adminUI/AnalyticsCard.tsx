import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import formatCurrency from "@/utils/formatCurrency";
import { DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { AnalyticsCardsSkeleton } from "./AnalyticsCardsSkeleton";

export interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
}

export default function AnalyticsCards({
  analytics,
  isFetching,
}: {
  analytics: AnalyticsData;
  isFetching?: boolean;
  Error?: boolean;
}) {
  const analyticsData = useMemo(
    () => [
      {
        title: "Total Revenue",
        value: formatCurrency(analytics.totalRevenue),
        icon: DollarSign,
        change: "+12%",
      },
      {
        title: "Total Sales",
        value: analytics.totalOrders,
        icon: ShoppingCart,
        change: "+8%",
      },
      {
        title: "Customers",
        value: analytics.totalCustomers,
        icon: TrendingUp,
        change: "+5%",
      },
    ],
    [analytics]
  );

  if (isFetching) return <AnalyticsCardsSkeleton />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {analyticsData.map((item, index) => (
        <Card key={index}>
          <div className="lg:mx-auto lg:w-[80%]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">
                {item.change} from last month
              </p>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}
