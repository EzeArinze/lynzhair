import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function CartItems({ item }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
      {/* Product info - mobile layout */}
      <div className="sm:hidden flex space-x-4">
        <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="flex-1">
          <Link
            href={`/product/${item.id}`}
            className="text-lg font-medium text-gray-900 hover:text-pink-600"
          >
            {item.name}
          </Link>
          <p className="text-sm text-gray-500 mt-1">
            {item.length} | {item.texture}
          </p>
          <div className="flex justify-between items-center mt-2">
            <span className="font-medium">${item.price.toFixed(2)}</span>
            <button
              onClick={() => {}}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center mt-2">
            <button
              onClick={() => {}}
              className="p-1 rounded-md border text-gray-600 hover:text-pink-600"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-3 py-1 text-center w-10">{item.quantity}</span>
            <button
              onClick={() => {}}
              className="p-1 rounded-md border text-gray-600 hover:text-pink-600"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product info - desktop layout */}
      <div className="hidden sm:block sm:col-span-6">
        <div className="flex items-center space-x-4">
          <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-cover object-center"
            />
          </div>
          <div>
            <Link
              href={`/product/${item.id}`}
              className="text-lg font-medium text-gray-900 hover:text-pink-600"
            >
              {item.name}
            </Link>
            {/* <p className="text-sm text-gray-500 mt-1">
              {item.length} | {item.texture}
            </p> */}
            <button
              onClick={() => {}}
              className="text-sm text-gray-500 hover:text-red-500 mt-1 flex items-center"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="hidden sm:block sm:col-span-2 text-center">
        <span className="font-medium">${item.price.toFixed(2)}</span>
      </div>

      {/* Quantity */}
      <div className="hidden sm:flex sm:col-span-2 justify-center items-center">
        <div className="flex items-center border rounded-md">
          <button
            onClick={() => {}}
            className="px-2 py-1 text-gray-600 hover:text-pink-600 disabled:opacity-50"
            disabled={item.quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-3 py-1 text-center w-10">{item.quantity}</span>
          <button
            onClick={() => {}}
            className="px-2 py-1 text-gray-600 hover:text-pink-600"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="hidden sm:block sm:col-span-2 text-right">
        <span className="font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </section>
  );
}

export default CartItems;
