"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { ShippingForm } from "@/components/CartUi/CheckoutForm";
import { ShippingFormData } from "@/utils/types";
import {
  express,
  freeShippingThreshold,
  overnight,
  standard,
} from "@/lib/constant/conatant";
import OrderSummary from "../CartUi/OrderSummary";
import useBasketStore from "@/store/cartStore";

export default function CheckOut() {
  // State for form data
  const [formData, setFormData] = useState<ShippingFormData>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    shippingMethod: "standard",
    agreeToTerms: false,
  });

  // Calculate order totals
  const getGroupedItem = useBasketStore((state) => state.getGroupedItem());

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  // Calculate cart totals
  // const groupedItems = getGroupedItem();
  const subtotal = getGroupedItem?.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const shipping =
    formData.shippingMethod === "standard"
      ? standard
      : formData.shippingMethod === "express"
      ? express
      : overnight;

  const total = subtotal + shipping;

  // Free shipping threshold
  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold;

  const groupItem = getGroupedItem.map((group) => ({
    product: group.product,
    quantity: group.quantity,
  }));

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would process the order here
    console.log(
      "Order submitted:",
      formData,
      groupItem,
      total,
      qualifiesForFreeShipping
    );
    // Redirect to payment gateway or order confirmation page
  };

  return (
    <section className="flex min-h-screen flex-col flex-1 py-10 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkout</h1>

          {/* Back to cart link */}
          <Link
            href="/cart"
            className="inline-flex items-center text-sm font-medium text-pink-600 hover:underline"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout form */}
          <div className="lg:col-span-2">
            <ShippingForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              qualifiesForFreeShipping={qualifiesForFreeShipping}
              freeShippingThreshold={freeShippingThreshold}
            />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              cartItems={getGroupedItem}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              qualifiesForFreeShipping={qualifiesForFreeShipping}
              freeShippingThreshold={freeShippingThreshold}
              shippingMethod={formData.shippingMethod}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
