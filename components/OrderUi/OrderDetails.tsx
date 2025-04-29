"use client";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getStatusBadge } from "@/hooks/getStatusbadge";
import NeedHelp from "./NeedHelp";
import ShippingInformation from "./ShippingInformation";
import OrderItems from "./OrderItems";
import { useGetOrderDetails } from "@/services/productsServices/getOrders";
import ErrorSituation from "../Error";
import React from "react";
import { GetDate } from "@/utils/getDate";

export default function OrderDetailsPage({ orderId }: { orderId: string }) {
  const { data: orderDetail, isLoading, error } = useGetOrderDetails(orderId);

  const statusHistory = React.useMemo(
    () => [
      { status: "Paid", date: orderDetail?.orderDate || "" },
      { status: "Pending", date: orderDetail?.updatedAt || "" },
      { status: "Shipped", date: orderDetail?.updatedAt || "" },
      { status: "Delivered", date: orderDetail?.updatedAt || "" },
    ],
    [orderDetail]
  );

  const LoadingPlaceholder = (
    <div className="animate-pulse bg-gray-100 rounded-lg h-24 mb-6"></div>
  );

  if (error) return <ErrorSituation situation="Order Details" />;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            href="/commerce/orders"
            className="inline-flex items-center text-sm font-medium text-pink-600 mb-6 hover:underline"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to all orders
          </Link>

          {/* Order Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Order #{orderDetail?.orderNumber}
              </h1>
              <p className="text-gray-500">
                Placed on{" "}
                {orderDetail?.orderDate
                  ? GetDate(orderDetail.orderDate)
                  : "N/A"}
              </p>
            </div>
            {/* <div className="mt-4 md:mt-0">
              <Button variant="outline" size="sm" className="flex items-center">
                <Printer className="mr-2 h-4 w-4" />
                Print Receipt
              </Button>
            </div> */}
          </div>

          {/* Order Status */}
          <div className="bg-white rounded-lg border overflow-hidden mb-8">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Order Status</h2>
                {isLoading ? (
                  <div className="animate-pulse bg-gray-100 rounded-lg h-10 mb-6" />
                ) : (
                  getStatusBadge(orderDetail?.status || "")
                )}
              </div>
            </div>

            {/* Status Timeline */}
            <div className="p-6">
              <div className="relative">
                {statusHistory.map((step, index) => (
                  <div key={step.status} className="flex mb-6 last:mb-0">
                    <div className="flex flex-col items-center mr-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.status.toLowerCase() === orderDetail?.status
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                      {index < statusHistory.length - 1 && (
                        <div className="w-0.5 bg-gray-200 h-full mt-2"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {step.status.toLowerCase() === "pending"
                          ? "Proccessing"
                          : step.status}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {step.status.toLowerCase() === "paid"
                          ? orderDetail?.orderDate
                            ? GetDate(orderDetail.orderDate)
                            : "Not Available"
                          : step.date
                            ? GetDate(step.date)
                            : "Not Available"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Items */}
          {isLoading
            ? LoadingPlaceholder
            : orderDetail && <OrderItems orderDetails={orderDetail} />}

          {/* Shipping Information */}
          {isLoading
            ? LoadingPlaceholder
            : orderDetail && (
                <ShippingInformation
                  orderDetails={orderDetail}
                  country="Nigeria"
                />
              )}

          {/* Need Help Section */}
          <NeedHelp page="details" />
        </div>
      </main>
    </div>
  );
}
