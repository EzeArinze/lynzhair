import React from "react";

function CartColumn() {
  return (
    <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b">
      <div className="col-span-6">
        <span className="text-sm font-medium text-gray-600">Product</span>
      </div>
      <div className="col-span-2 text-center">
        <span className="text-sm font-medium text-gray-600">Price</span>
      </div>
      <div className="col-span-2 text-center">
        <span className="text-sm font-medium text-gray-600">Quantity</span>
      </div>
      <div className="col-span-2 text-right">
        <span className="text-sm font-medium text-gray-600">Total</span>
      </div>
    </div>
  );
}

export default CartColumn;
