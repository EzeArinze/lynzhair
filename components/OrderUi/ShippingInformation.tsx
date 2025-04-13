import {
  DeliveryType,
  getEstimatedDeliveryTime,
} from "@/utils/getEstimatedtime";
import { getShippingMethodInfo } from "@/utils/getShippingMethodInfo";
import React from "react";

interface OrderDetails {
  customerName: string;
  address: string;
  city: string;
  state: string;
  status: string;
  updated_At?: string;
  orderDate: string;
  shippingMethod: string;
}

function ShippingInformation({
  orderDetails,
  country,
}: {
  orderDetails: OrderDetails;
  country: string;
}) {
  return (
    <div className="bg-white rounded-lg border overflow-hidden mb-8">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">Shipping Information</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Shipping Address
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">{orderDetails?.customerName}</p>
              <p>{orderDetails?.address}</p>
              <p>
                {orderDetails?.city}, {orderDetails?.state}{" "}
              </p>
              <p>{country}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Delivery Information
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>{getShippingMethodInfo(orderDetails?.shippingMethod)}</p>
              {orderDetails?.status === "delivered" ? (
                <p className="text-green-600 mt-2">
                  Delivered on {orderDetails?.updated_At}
                </p>
              ) : (
                <p className="mt-2">
                  Estimated delivery:{" "}
                  {getEstimatedDeliveryTime(
                    orderDetails?.shippingMethod as DeliveryType,
                    orderDetails?.orderDate
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingInformation;
