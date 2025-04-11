"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, Calendar, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getStatusBadge } from "@/hooks/getStatusbadge";
import formatCurrency from "@/utils/formatCurrency";

// Mock order data
const orders = [
  {
    id: "LH-10042587",
    date: "March 15, 2025",
    status: "delivered",
    total: 349.97,
    items: [
      {
        id: 1,
        name: "Brazilian Body Wave Hair Bundle",
        quantity: 2,
        price: 129.99,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 5,
        name: "HD Lace Frontal",
        quantity: 1,
        price: 89.99,
        image: "/placeholder.svg?height=80&width=80&text=Frontal",
      },
    ],
  },
  {
    id: "LH-10042432",
    date: "February 28, 2025",
    status: "delivered",
    total: 269.98,
    items: [
      {
        id: 2,
        name: "Peruvian Straight Hair",
        quantity: 2,
        price: 134.99,
        image: "/placeholder.svg?height=80&width=80&text=Peruvian",
      },
    ],
  },
  {
    id: "LH-10042301",
    date: "February 10, 2025",
    status: "processing",
    total: 169.99,
    items: [
      {
        id: 3,
        name: "Malaysian Curly Hair",
        quantity: 1,
        price: 169.99,
        image: "/placeholder.svg?height=80&width=80&text=Malaysian",
      },
    ],
  },
  {
    id: "LH-10042188",
    date: "January 22, 2025",
    status: "cancelled",
    total: 299.99,
    items: [
      {
        id: 6,
        name: "Full Lace Wig",
        quantity: 1,
        price: 299.99,
        image: "/placeholder.svg?height=80&width=80&text=Wig",
      },
    ],
  },
];

export default function OrdersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-10 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-600 mt-1">View your order history</p>
          </div>

          {/* Orders List */}
          {orders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => (
                <Card
                  key={order.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">
                            Order #{order.id}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            {order.date}
                          </div>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>

                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium truncate">
                                {item.name}
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
                          {formatCurrency(order.total)}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="h-9"
                      >
                        <Link href={`/commerce/orders/${order.id}`}>
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
          <div className="mt-10 bg-pink-50 rounded-lg p-6 max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold mb-2">
              Need Help With Your Order?
            </h2>
            <p className="text-gray-600 mb-4">
              Our customer service team is here to assist you with any questions
              about your orders.
            </p>
            <Button
              asChild
              className="bg-pink-600 hover:bg-pink-700 text-white"
            >
              <Link href="/commerce/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
