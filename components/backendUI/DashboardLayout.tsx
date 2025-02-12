import React from "react";
import AnalyticsCards from "./AnalyticsCard";
import RecentOrders from "./RecentOrders";

function DashboardLayout() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div>
        <AnalyticsCards />
      </div>
      {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50 bg-yellow-400" />
          <div className="aspect-video rounded-xl bg-muted/50 bg-blue-400" />
          <div className="aspect-video rounded-xl bg-muted/50 bg-pink-400" />
          
        </div> */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min bg-green-400 " /> */}
        <RecentOrders />
      </div>
    </div>
  );
}

export default DashboardLayout;
