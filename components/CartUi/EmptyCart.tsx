"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyCartPage() {
  return (
    <section className="flex min-h-screen flex-col">
      <div className="flex-1 py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>

          {/* Empty cart state */}
          <div className="bg-white rounded-lg border p-10 text-center max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added any items to your cart yet.
              Explore our collection to find premium quality hairs.
            </p>
            <Button
              asChild
              className="bg-pink-600 hover:bg-pink-700 text-white px-8"
            >
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>

          {/* Recommended products */}
          {/* <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Popular Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
