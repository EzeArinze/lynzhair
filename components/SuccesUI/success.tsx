"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfettiEffect from "./ConfettiEffect";
import { useGetOrder } from "@/services/productsServices/getOrders";
import ErrorSituation from "../Error";

export default function SuccessPage() {
  const { data: orderData, isLoading, error } = useGetOrder();

  const newDate = (date: string) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime())
      ? "N/A"
      : parsedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  };

  if (error) return <ErrorSituation situation="order details" />;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-10 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Payment Successful!
            </h1>
            <p className="text-gray-600 max-w-md mx-auto text-lg">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </motion.div>

          {/* Order Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg border shadow-sm overflow-hidden mb-10 max-w-3xl mx-auto"
          >
            <div className="p-6 border-b">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-1">
                    Order #
                    {isLoading
                      ? "loading..."
                      : orderData?.at(0)?.orderNumber || "N/A"}
                  </h2>
                  <p className="text-gray-500">
                    Placed on{" "}
                    {orderData?.at(0)?.orderDate &&
                      newDate(orderData?.at(0)?.orderDate ?? "N/A")}
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="mt-4 md:mt-0"
                >
                  <Link href="/commerce/orders">
                    View Order
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="p-6">
              {/* Next Steps */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">
                  What&apos;`s Next?
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-pink-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600">
                      You can track your order status in your Order page.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          >
            <Button
              asChild
              className="bg-pink-600 hover:bg-pink-700 text-white"
            >
              <Link href="/">Continue Shopping</Link>
            </Button>
          </motion.div>
        </div>
      </main>

      <ConfettiEffect />
    </div>
  );
}
