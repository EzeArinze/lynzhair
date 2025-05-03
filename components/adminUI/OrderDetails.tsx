"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Truck,
  CreditCard,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import getStatusColor from "@/utils/getStatusColor";
import { useGetOrderDetails } from "@/services/productsServices/getOrders";
import formatCurrency from "@/utils/formatCurrency";
import { adminFormatDate } from "@/utils/getDate";
import { getShippingMethodInfo } from "@/utils/getShippingMethodInfo";
import LoaderWithDetail from "../frontendUI/LoaderWithDetail";

export default function OrderDetailsPage({ id }: { id: string }) {
  const { data: order, isLoading } = useGetOrderDetails(id);

  if (isLoading) return <LoaderWithDetail option="Loading detail..." />;

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">Order Not Found</h2>
        <p className="mt-2 text-gray-600">
          The order you&apos;re looking for doesn&apos;t exist or you don&apos;t
          have permission to view it.
        </p>
        <Button asChild className="mt-6">
          <Link href="/admin/order">Back to Orders</Link>
        </Button>
      </div>
    );
  }

  return (
    <section className="space-y-6 w-[80%] mx-auto mt-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/order">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Order Details</h1>
        </div>
        <div className="mt-2 sm:mt-0">
          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Order Summary Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Order Summary</CardTitle>
            <CardDescription className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Placed on {adminFormatDate(order.orderDate)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Order Number:</span>
                <span>{order.orderNumber}</span>
              </div>
              <Separator />

              <div className="space-y-4">
                {order.products.map((item) => (
                  <div
                    key={item.product._id}
                    className="bg-white border rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-16 w-16 relative rounded-md overflow-hidden border">
                          <Image
                            src={
                              item.product.images[0]?.public_url ||
                              "/placeholder.svg?height=64&width=64"
                            }
                            alt={item.product.name || "Product Image"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Unit Price:{" "}
                            {formatCurrency(item.product.price, order.currency)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-8">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Quantity</p>
                          <p className="font-medium">{item.quantity}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Total</p>
                          <p className="font-medium">
                            {formatCurrency(
                              item.product.price * item.quantity,
                              order.currency
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>
                    {order?.freeShipping
                      ? "Free Shipping (3-5 business days)"
                      : getShippingMethodInfo(order?.shippingMethod)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type</span>
                  <span>{order.shippingMethod}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(order?.totalPrice)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer & Shipping Info */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start">
                <span className="font-medium mr-2">{order.customerName}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="mr-2 h-4 w-4" />
                <span>{order.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="mr-2 h-4 w-4" />
                <span>{order.phone_number}</span>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm">
                <MapPin className="mr-2 h-4 w-4 text-gray-600" />
                <div>
                  <p>{order.address}</p>
                  <p>
                    {order.city}, {order.state}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <Truck className="mr-2 h-4 w-4 text-gray-600" />
                <span>{order.shippingMethod}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm">
                <CreditCard className="mr-2 h-4 w-4 text-gray-600" />
                <span>Paystack</span>
              </div>
              <div className="text-sm text-gray-600">
                <p className="truncate">
                  Session ID: {order.paystackCheckoutSessionId}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
