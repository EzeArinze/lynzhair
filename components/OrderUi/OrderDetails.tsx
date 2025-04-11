"use client";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getStatusBadge } from "@/hooks/getStatusbadge";
import NeedHelp from "./NeedHelp";
import ShippingInformation from "./ShippingInformation";
import OrderItems from "./OrderItems";

// Mock order data - in a real app, you would fetch this based on the order ID
const orderDetails = {
  id: "LH-10042587",
  date: "March 15, 2025",
  status: "delivered",
  statusHistory: [
    { status: "Processing", date: "March 16, 2025" },
    { status: "Shipped", date: "March 17, 2025" },
    { status: "Out for Delivery", date: "March 19, 2025" },
    { status: "Delivered", date: "March 19, 2025" },
  ],
  items: [
    {
      id: "1",
      name: "Brazilian Body Wave Hair Bundle",
      quantity: 2,
      price: 129.99,
      image: "/placeholder.svg?height=100&width=100",
      length: "18 inches",
      texture: "Body Wave",
    },
    {
      id: "5",
      name: "HD Lace Frontal",
      quantity: 1,
      price: 89.99,
      image: "/placeholder.svg?height=100&width=100&text=Frontal",
      length: "18 inches",
      texture: "Straight",
    },
  ],
  subtotal: 349.97,
  shipping: 0,
  tax: 28.0,
  total: 377.97,
  paymentMethod: "Visa ending in 4242",
  shippingAddress: {
    name: "Jane Smith",
    address: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
  },
  estimatedDelivery: "March 19-21, 2025",
  actualDelivery: "March 19, 2025",
};

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  // In a real app, you would fetch the order details based on the ID
  const orderId = params.id || "123456";
  console.log(orderId);

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
                Order #{orderDetails.id}
              </h1>
              <p className="text-gray-500">Placed on {orderDetails.date}</p>
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
                {getStatusBadge(orderDetails.status)}
              </div>
            </div>

            {/* Status Timeline */}
            <div className="p-6">
              <div className="relative">
                {orderDetails.statusHistory.map((step, index) => (
                  <div key={index} className="flex mb-6 last:mb-0">
                    <div className="flex flex-col items-center mr-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === orderDetails.statusHistory.length - 1
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                      {index < orderDetails.statusHistory.length - 1 && (
                        <div className="w-0.5 bg-gray-200 h-full mt-2"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{step.status}</h3>
                      <p className="text-sm text-gray-500">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <OrderItems orderDetails={orderDetails} />

          {/* Shipping Information */}
          <ShippingInformation orderDetails={orderDetails} />

          {/* Need Help Section */}
          <NeedHelp page="details" />
        </div>
      </main>
    </div>
  );
}
