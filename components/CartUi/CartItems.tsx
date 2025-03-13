import formatCurrency from "@/utils/formatCurrency";
import { productType } from "@/utils/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CartItemProp {
  item: productType;
  quantity: number;
  onRemove: () => void;
  increment: () => void;
  decrement: () => void;
}

function CartItems({
  item,
  quantity,
  onRemove,
  increment,
  decrement,
}: CartItemProp) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
      {/* Product info - mobile layout */}
      <div className="sm:hidden flex space-x-4">
        <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
          <Image
            src={item.images.at(0)?.public_url || "/placeholder.svg"}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center"
          />
        </div>
        <div className="flex-1">
          <Link
            href={`/commerce/product-detail/${item._id}`}
            className="text-lg font-medium text-gray-900 hover:text-pink-600"
          >
            {item.name}
          </Link>
          <p className="text-sm text-gray-500 mt-1">{item.category}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="font-medium">{formatCurrency(item.price)}</span>
            <button
              onClick={onRemove}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center mt-2">
            <button
              onClick={decrement}
              className="p-1 rounded-md border text-gray-600 hover:text-pink-600"
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-3 py-1 text-center w-10">{quantity}</span>
            <button
              onClick={increment}
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
              src={item.images.at(0)?.public_url || "/placeholder.svg"}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center"
            />
          </div>
          <div>
            <Link
              href={`/commerce/product-detail/${item._id}`}
              className="text-lg font-medium text-gray-900 hover:text-pink-600"
            >
              {item.name}
            </Link>
            <p className="text-sm text-gray-500 mt-1">{item.category}</p>
            <button
              onClick={onRemove}
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
        <span className="font-medium">{formatCurrency(item.price)}</span>
      </div>

      {/* Quantity */}
      <div className="hidden sm:flex sm:col-span-2 justify-center items-center">
        <div className="flex items-center border rounded-md">
          <button
            onClick={decrement}
            className="px-2 py-1 text-gray-600 hover:text-pink-600 disabled:opacity-50"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-3 py-1 text-center w-10">{quantity}</span>
          <button
            onClick={increment}
            className="px-2 py-1 text-gray-600 hover:text-pink-600"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="hidden sm:block sm:col-span-2 text-right">
        <span className="font-semibold">
          {formatCurrency(item.price * quantity)}
        </span>
      </div>
    </section>
  );
}

export default CartItems;
