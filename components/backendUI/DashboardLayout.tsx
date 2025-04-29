"use client";

import React from "react";
import AnalyticsCards from "./AnalyticsCard";
import RecentOrders from "./RecentOrders";
import { useAdminRecentOrders } from "@/services/productsServices/getAdminOrders";

function DashboardLayout() {
  const { data: recentOrder, isLoading, isError } = useAdminRecentOrders();

  // const totalRevenue = recentOrder?.orders?.reduce(
  //   (acc, order) => acc + order.totalPrice,
  //   0
  // );

  // const totalOrders = recentOrder?.orders?.length || 0;

  // const totalCustomers = recentOrder
  //   ? new Set(recentOrder?.orders?.map((order) => order.customerName)).size
  //   : 0; // Unique customers (Numbers of unique customer names)

  const analyticsData = {
    totalRevenue: recentOrder?.totalRevenue || 0,
    totalOrders: recentOrder?.totalOrders || 0,
    totalCustomers: recentOrder?.totalCustomers || 0,
  };

  return (
    <div className="flex flex-1 flex-col gap-8 p-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div>
        <AnalyticsCards analytics={analyticsData} isFetching={isLoading} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min bg-green-400 " /> */}
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
