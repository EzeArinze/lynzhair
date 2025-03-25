"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ShippingFormData } from "@/utils/types";
import {
  express,
  freeShippingThreshold,
  overnight,
  standard,
} from "@/lib/constant/constant";
import dynamic from "next/dynamic";
import LoadingSpinner from "../Loader";
import { useGroupedItems } from "@/utils/useGroupedItems";
import Script from "next/script";
import { SCRIPT_SRC } from "@/lib/constant/env";
import { initializePayment } from "@/actions/initializePayment";

const ShippingForm = dynamic(
  () =>
    import("@/components/CartUi/CheckoutForm").then((mod) => mod.ShippingForm),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
);

const OrderSummary = dynamic(() => import("../CartUi/OrderSummary"), {
  loading: () => <LoadingSpinner />,
  ssr: true,
});

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

  const getGroupedItem = useGroupedItems();

  const subtotal =
    getGroupedItem?.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    ) || 0;

  const shipping =
    formData.shippingMethod === "standard"
      ? standard
      : formData.shippingMethod === "express"
      ? express
      : overnight;

  const total = subtotal + shipping;

  // Free shipping threshold
  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold;

  const groupItem = getGroupedItem?.map((group) => ({
    product: group.product,
    quantity: group.quantity,
  }));

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // process the order here
    const metadata = {
      ...formData,
      method: qualifiesForFreeShipping,
      totalAmount: total,
      product: groupItem?.map((item) => ({
        name: item.product.name,
        image: item.product.images[0].public_url,
        quantity: item.quantity,
      })),
    };

    setFormData({
      fullName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      shippingMethod: "standard",
      agreeToTerms: false,
    });

    initializePayment(metadata);
  };

  return (
    <section className="flex min-h-screen flex-col flex-1 py-10 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8  lg:w-[80%]">
        {/* Page title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkout</h1>

          {/* Back to cart link */}
          <Link
            href="/commerce/cart"
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
              cartItems={getGroupedItem || undefined}
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
      {SCRIPT_SRC && <Script src={SCRIPT_SRC} strategy="afterInteractive" />}
    </section>
  );
}
