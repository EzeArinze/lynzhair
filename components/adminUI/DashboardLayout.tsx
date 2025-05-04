"use client";

import React, { useMemo } from "react";
import AnalyticsCards from "./AnalyticsCard";
import RecentOrders from "./RecentOrders";
import { useAdminOrdersOption } from "@/services/productsServices/getAdminOrders";
import SalesLineChart from "./SalesLineChart";
import { GetDate } from "@/utils/getDate";
import { RecentOrderLimit } from "@/lib/constant/constant";

function DashboardLayout() {
  const {
    data: recentOrder,
    isLoading,
    isError,
  } = useAdminOrdersOption({ recent: true, limit: RecentOrderLimit });

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
  const salesData = useMemo(() => {
    return (
      adminOrders?.orders?.map((order) => ({
        date: GetDate(order.orderDate),
        sales: order.totalPrice,
      })) ?? []
    );
  }, [adminOrders]);

  return (
    <div className="flex flex-1 flex-col gap-8 p-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div>
        <AnalyticsCards analytics={analyticsData} isFetching={OrdersLoading} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 h-fit">
        <SalesLineChart data={salesData} isLoading={OrdersLoading} />
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
