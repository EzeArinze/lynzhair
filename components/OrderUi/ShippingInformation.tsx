import React from "react";

interface OrderDetails {
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  status: string;
  actualDelivery?: string;
  estimatedDelivery: string;
}

function ShippingInformation({ orderDetails }: { orderDetails: OrderDetails }) {
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
              <p className="font-medium">{orderDetails.shippingAddress.name}</p>
              <p>{orderDetails.shippingAddress.address}</p>
              <p>
                {orderDetails.shippingAddress.city},{" "}
                {orderDetails.shippingAddress.state}{" "}
                {orderDetails.shippingAddress.zipCode}
              </p>
              <p>{orderDetails.shippingAddress.country}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Delivery Information
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>Standard Shipping (3-5 business days)</p>
              {orderDetails.status === "delivered" ? (
                <p className="text-green-600 mt-2">
                  Delivered on {orderDetails.actualDelivery}
                </p>
              ) : (
                <p className="mt-2">
                  Estimated delivery: {orderDetails.estimatedDelivery}
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
