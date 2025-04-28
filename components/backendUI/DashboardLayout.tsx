"use client";

import React from "react";
import AnalyticsCards from "./AnalyticsCard";
import RecentOrders from "./RecentOrders";
import { useAdminRecentOrders } from "@/services/productsServices/getAdminOrders";

function DashboardLayout() {
  const { data: recentOrder, isFetching, isError } = useAdminRecentOrders();

  const totalRevenue = recentOrder?.reduce(
    (acc, order) => acc + order.totalPrice,
    0
  );

  const totalOrders = recentOrder?.length || 0;

  const totalCustomers = recentOrder
    ? new Set(recentOrder.map((order) => order.customerName)).size
    : 0; // Unique customers (Numbers of unique customer names)

  const analyticsData = {
    totalRevenue: totalRevenue || 0,
    totalOrders: totalOrders || 0,
    totalCustomers: totalCustomers || 0,
  };

  return (
    <div className="flex flex-1 flex-col gap-8 p-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div>
        <AnalyticsCards analytics={analyticsData} isFetching={isFetching} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min bg-green-400 " /> */}
        <RecentOrders
          recentOrder={recentOrder}
          isFetching={isFetching}
          Error={isError}
        />
      </div>
    </div>
  );
}

export default DashboardLayout;
