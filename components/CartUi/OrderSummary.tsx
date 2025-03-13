import { CreditCard, ShieldCheck } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

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
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          <Separator className="my-3" />

          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout button */}
        <Button className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white">
          Proceed to Checkout
        </Button>

        {/* Trust badges */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <ShieldCheck className="h-4 w-4 text-gray-400" />
            <span>Secure Checkout</span>
            <CreditCard className="h-4 w-4 text-gray-400 ml-2" />
            <span>Multiple Payment Options</span>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {[
              { name: "visa", image: "/visa.svg" },
              { name: "mastercard", image: "/mastercard.svg" },
              { name: "verve", image: "/verve.svg" },
            ].map((method) => (
              <div
                key={method.name}
                className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center"
              >
                <Image
                  src={method.image}
                  alt={method.name}
                  width={30}
                  height={20}
                  className="w-auto h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderSummary;
