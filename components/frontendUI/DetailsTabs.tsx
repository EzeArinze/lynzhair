import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

function DetailsTabs({ description }: { description: string | undefined }) {
  return (
    <div className="mb-16">
      <Tabs defaultValue="description">
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-6">
          <TabsTrigger
            value="description"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-pink-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-sm font-medium"
          >
            Description
          </TabsTrigger>

          <TabsTrigger
            value="shipping"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-pink-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-sm font-medium"
          >
            Shipping & Returns
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-0">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">{description}</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our hair is sourced ethically from donors, ensuring the highest
              quality and most natural look. The body wave pattern is versatile
              and can be styled in multiple ways to achieve your desired look.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="shipping" className="mt-0">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Shipping Information
              </h3>
              <p className="text-gray-700 mb-4">
                We offer the following shipping options for all domestic orders:
              </p>
              <ul className="space-y-2">
                <li className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">
                    Standard Shipping (3-5 business days)
                  </span>
                  <span>$7.99 (Free on orders over $150)</span>
                </li>
                <li className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">
                    Express Shipping (2-3 business days)
                  </span>
                  <span>$14.99</span>
                </li>
                <li className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">
                    Next Day Delivery (order by 2pm)
                  </span>
                  <span>$24.99</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Return Policy</h3>
              <p className="text-gray-700 mb-4">
                We want you to be completely satisfied with your purchase. If
                for any reason you&apos;re not happy with your order, we offer a
                30-day return policy under the following conditions:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>
                  Hair must be in its original condition - unworn, unwashed, and
                  unaltered
                </li>
                <li>Original packaging must be intact</li>
                <li>
                  Return shipping costs are the responsibility of the customer
                </li>
                <li>Custom orders and sale items are final sale</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DetailsTabs;
