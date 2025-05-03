"use client";

import React, { useMemo } from "react";
import AnalyticsCards from "./AnalyticsCard";
import RecentOrders from "./RecentOrders";
import { useAdminOrdersOption } from "@/services/productsServices/getAdminOrders";

function DashboardLayout() {
  const {
    data: recentOrder,
    isLoading,
    isError,
  } = useAdminOrdersOption({ recent: true, limit: 6 });

  const { data: adminOrders, isLoading: OrdersLoading } = useAdminOrdersOption({
    recent: false,
  });

  const analyticsData = useMemo(
    () => ({
      totalRevenue: adminOrders?.totalRevenue || 0,
      totalOrders: adminOrders?.totalOrders || 0,
      totalCustomers: adminOrders?.totalCustomers || 0,
    }),
    [adminOrders]
  );

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 h-full">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div>
        <AnalyticsCards analytics={analyticsData} isFetching={OrdersLoading} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 h-full">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min bg-green-400 " />
        <RecentOrders
          recentOrder={recentOrder}
          isFetching={isLoading}
          Error={isError}
        />
      </div>
    </div>
  );
}

export default DashboardLayout;
