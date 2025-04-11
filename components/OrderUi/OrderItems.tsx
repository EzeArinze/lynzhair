import formatCurrency from "@/utils/formatCurrency";
import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

interface OrderDetails {
  items: {
    id: string;
    name: string;
    image?: string;
    length: string;
    texture: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
}

function OrderItems({ orderDetails }: { orderDetails: OrderDetails }) {
  return (
    <div className="bg-white rounded-lg border overflow-hidden mb-8">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">Order Items</h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {orderDetails.items.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row">
              <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="sm:ml-6 flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.length} | {item.texture}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0 sm:text-right">
                    <p className="text-sm font-medium">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                    <p className="text-base font-semibold mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm"
                    asChild
                  >
                    <Link href={`commerce/product-detials/${item.id}`}>
                      View Product
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <Separator className="my-6" />

          {/* Order Summary */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>{formatCurrency(orderDetails.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span>
                {orderDetails.shipping === 0
                  ? "Free"
                  : `${formatCurrency(orderDetails.shipping)}`}
              </span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatCurrency(orderDetails.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItems;
