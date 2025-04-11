import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function NeedHelp({ page }: { page: string }) {
  const isOrderPage = page === "order";

  return (
    <>
      {isOrderPage ? (
        <div className="mt-10 bg-pink-50 rounded-lg p-6 max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold mb-2">
            Need Help With Your Order?
          </h2>
          <p className="text-gray-600 mb-4">
            Our customer service team is here to assist you with any questions
            about your orders.
          </p>
          <Button asChild className="bg-pink-600 hover:bg-pink-700 text-white">
            <Link href="/commerce/contact">Contact Support</Link>
          </Button>
        </div>
      ) : (
        <div className="bg-pink-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-2">
            Need Help With Your Order?
          </h2>
          <p className="text-gray-600 mb-4">
            Our customer service team is here to assist you with any questions
            about your order.
          </p>

          {/* Related Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-start">
            <Button
              asChild
              className="bg-pink-600 hover:bg-pink-700 text-white"
            >
              <Link href="/commerce/contact">Contact Support</Link>
            </Button>
            <Button
              asChild
              className="bg-white hover:bg-pink-700 hover:text-white border border-pink-700 text-gray-600"
            >
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default NeedHelp;
