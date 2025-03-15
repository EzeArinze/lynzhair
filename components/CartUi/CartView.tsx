"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
// import { Input } from "@/components/ui/input"
import OrderSummary from "./OrderSummary";
import EmptyCartPage from "./EmptyCart";
import CartItems from "./CartItems";
import CartColumn from "./CartColumn";
import useBasketStore from "@/store/cartStore";
import { freeShippingThreshold, standard } from "@/lib/constant/conatant";

export default function CartView() {
  const { getGroupedItem, removeItem, incrementQuantity, decrementQuantity } =
    useBasketStore();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  // Calculate cart totals
  const groupedItems = getGroupedItem();
  const subtotal = groupedItems?.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal >= freeShippingThreshold ? 0 : standard;
  const total = subtotal + shipping;

  // Update item quantity

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-500 mt-1">
              {groupedItems.length}{" "}
              {groupedItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {groupedItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Cart items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border overflow-hidden">
                  <CartColumn />

                  {/* Cart items list */}
                  {groupedItems.map((item) => (
                    <div
                      key={item.product._id}
                      className="p-4 sm:p-6 border-b last:border-b-0"
                    >
                      <CartItems
                        item={item.product}
                        quantity={item.quantity}
                        onRemove={() => removeItem(item.product._id)}
                        increment={() => incrementQuantity(item.product._id)}
                        decrement={() => decrementQuantity(item.product._id)}
                      />
                    </div>
                  ))}

                  {/* Continue shopping */}
                  <div className="p-4 sm:p-6 bg-gray-50">
                    <Link
                      href="/"
                      className="inline-flex items-center text-sm font-medium text-pink-600 hover:underline"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Continue shopping
                    </Link>
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <OrderSummary
                subtotal={subtotal}
                total={total}
                shipping={shipping}
              />
            </div>
          ) : (
            <EmptyCartPage />
          )}
        </div>
      </main>
    </div>
  );
}
