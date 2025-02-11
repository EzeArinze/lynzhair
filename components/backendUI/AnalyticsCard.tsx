import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

const analyticsData = [
  {
    title: "Total Revenue",
    value: "NGN 54,231",
    icon: DollarSign,
    change: "+12%",
  },
  { title: "Total Sales", value: "1,234", icon: ShoppingCart, change: "+8%" },
  // { title: "New Customers", value: "321", icon: Users, change: "+23%" },
  { title: "Conversion Rate", value: "3.5%", icon: TrendingUp, change: "+5%" },
];

export default function AnalyticsCards() {
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
