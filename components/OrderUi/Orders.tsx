"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, Calendar, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getStatusBadge } from "@/hooks/getStatusbadge";
import formatCurrency from "@/utils/formatCurrency";
import NeedHelp from "./NeedHelp";
import { useGetOrder } from "@/services/productsServices/getOrders";
import ErrorSituation from "../Error";
import OrderSkeleton from "./OrderSkeleton";

export default function Orders() {
  const { data: orderData, isLoading, error } = useGetOrder();

  if (isLoading) return <OrderSkeleton />;
  if (error) return <ErrorSituation situation="orders" />;

  return (
    <section className="flex-1 py-10 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-1">View your order history</p>
        </div>

        {/* Orders List */}
        {orderData && orderData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orderData.map((order) => (
              <Card
                key={order._id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          Order #{order.orderNumber}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(order.orderDate).toLocaleDateString()}
                        </div>
                      </div>
                      {getStatusBadge(order.status || "processing")}
                    </div>

                    <div className="space-y-3 h-16 overflow-y-auto hide-scrollbar">
                      {order.products.map((item) => (
                        <div
                          key={item.product._id}
                          className="flex items-center"
                        >
                          <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={
                                item.product.images[0]?.public_url ||
                                "/placeholder.svg"
                              }
                              alt={item.product.name}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium truncate">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="p-4 bg-gray-50 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-semibold">
                        {formatCurrency(order.totalPrice)}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild className="h-9">
                      <Link href={`/commerce/orders/${order._id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border p-8 text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
            <p className="text-gray-500 mb-6">
              You haven&apos;t placed any orders yet.
            </p>
            <Button
              asChild
              className="bg-pink-600 hover:bg-pink-700 text-white"
            >
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>
        )}

        {/* Need Help Section */}
        <NeedHelp page="order" />
      </div>
    </section>
  );
}
