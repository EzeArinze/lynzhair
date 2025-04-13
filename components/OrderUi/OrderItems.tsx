import formatCurrency from "@/utils/formatCurrency";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { OrderDetail } from "@/utils/types";

function OrderItems({ orderDetails }: { orderDetails: OrderDetail }) {
  return (
    <div className="bg-white rounded-lg border overflow-hidden mb-8">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">Order Items</h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {orderDetails?.products?.map((item) => (
            <div key={item.product._id} className="flex flex-col sm:flex-row">
              <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
                <Image
                  src={
                    item?.product?.images?.at(0)?.public_url ||
                    "/placeholder.svg"
                  }
                  alt={item?.product.name}
                  fill
                  sizes="100%"
                  className="object-cover"
                />
              </div>
              <div className="sm:ml-6 flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <div>
                    <h3 className="text-lg font-medium">
                      {item?.product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-through">
                      {formatCurrency(item.product?.discount)}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0 sm:text-right">
                    <p className="text-sm font-medium">
                      {formatCurrency(item?.product.price)} x {item?.quantity}
                    </p>
                    <p className="text-base font-semibold mt-1">
                      {formatCurrency(item?.product.price * item?.quantity)}
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
                    <Link
                      href={`/commerce/product-detail/${item?.product._id}`}
                    >
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
              <span className="text-gray-600">Shipping</span>
              <span>
                {orderDetails?.freeShipping === true
                  ? "Free Shipping qualified"
                  : orderDetails?.shippingMethod}
              </span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatCurrency(orderDetails?.totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItems;
