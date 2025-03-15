import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import formatCurrency from "@/utils/formatCurrency";
import TrustBadges from "./TrustBadges";
import Link from "next/link";
import { Check } from "lucide-react";
import { BasketItem } from "@/store/cartStore";

interface orderSummaryProps {
  cartItems?: BasketItem[];
  subtotal: number;
  shipping: number;
  total: number;
  qualifiesForFreeShipping?: boolean;
  freeShippingThreshold?: number;
  shippingMethod?: string;
}

function OrderSummary({
  cartItems = [],
  subtotal,
  shipping,
  total,
  qualifiesForFreeShipping,
  freeShippingThreshold,
  shippingMethod,
}: orderSummaryProps) {
  const actualShipping =
    qualifiesForFreeShipping && shippingMethod === "standard" ? 0 : shipping;

  return cartItems.length === 0 ? (
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
        <Button
          className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white"
          asChild
        >
          <Link href="/commerce/checkout">Proceed to Checkout</Link>
        </Button>

        {/* Trust badges */}
        <TrustBadges />
      </div>
    </section>
  ) : (
    <div className="bg-white rounded-lg border p-6 sticky top-20">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3 text-sm">
        {/* Order items summary */}
        <div className="space-y-3 pb-3 border-b">
          {cartItems.map((item) => (
            <div key={item.product._id} className="flex justify-between">
              <span className="flex-1">
                {item.product.name}{" "}
                <span className="text-gray-500">x{item.quantity}</span>
              </span>
              <span className="font-medium">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {qualifiesForFreeShipping && shippingMethod === "standard"
              ? "Free"
              : `$${actualShipping.toFixed(2)}`}
          </span>
        </div>

        <Separator className="my-3" />

        <div className="flex justify-between text-base font-semibold">
          <span>Total</span>
          <span>${(subtotal + actualShipping).toFixed(2)}</span>
        </div>
      </div>

      {/* Free shipping message */}
      {qualifiesForFreeShipping ? (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-700">
          <p className="flex items-center">
            <Check className="h-4 w-4 mr-2" />
            You qualify for free standard shipping!
          </p>
        </div>
      ) : (
        <div className="mt-4 p-3 bg-gray-50 border rounded-md text-sm text-gray-600">
          <p>
            Add ${((freeShippingThreshold ?? 0) - subtotal).toFixed(2)} more to
            qualify for free shipping.
          </p>
        </div>
      )}

      {/* Trust badges */}
    </div>
  );
}

export default OrderSummary;
