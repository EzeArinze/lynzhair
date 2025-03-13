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

// Mock cart items
const initialCartItems = [
  {
    id: 1,
    name: "Brazilian Body Wave Hair Bundle",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    quantity: 2,
    length: "18 inches",
    texture: "Body Wave",
  },
  {
    id: 5,
    name: "HD Lace Frontal",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300&text=Frontal",
    quantity: 1,
    length: "18 inches",
    texture: "Straight",
  },
];

export default function CartView() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cartItems, setCartItems] = useState(initialCartItems);

  const getGroupedItem = useBasketStore((state) => state.getGroupedItem());

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  // Calculate cart totals
  const subtotal = getGroupedItem.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 150000 ? 0 : 4000;
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
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>

          {getGroupedItem.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Cart items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border overflow-hidden">
                  <CartColumn />

                  {/* Cart items list */}
                  {getGroupedItem.map((item) => (
                    <div
                      key={item.product._id}
                      className="p-4 sm:p-6 border-b last:border-b-0"
                    >
                      <CartItems item={item.product} quantity={item.quantity} />
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
