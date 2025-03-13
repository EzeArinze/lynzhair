import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import formatCurrency from "@/utils/formatCurrency";
import TrustBadges from "./TrustBadges";

interface orderSummaryProps {
  subtotal: number;
  shipping?: number;
  total: number;
}

function OrderSummary({ subtotal, shipping = 0, total }: orderSummaryProps) {
  return (
    <section className="lg:col-span-1">
      <div className="bg-white rounded-lg border p-6 sticky top-20">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">
              {shipping === 0 ? "Free" : `${formatCurrency(shipping)}`}
            </span>
          </div>

          <Separator className="my-3" />

          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        {/* Checkout button */}
        <Button className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white">
          Proceed to Checkout
        </Button>

        {/* Trust badges */}
        <TrustBadges />
      </div>
    </section>
  );
}

export default OrderSummary;
