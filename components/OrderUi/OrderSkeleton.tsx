import React from "react";

function OrderSkeleton() {
  return (
    <section className="flex-1 py-10 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-3 h-16 overflow-y-auto hide-scrollbar">
                  {Array.from({ length: 2 }).map((_, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0"></div>
                      <div className="ml-3 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-gray-50 flex justify-between items-center">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="h-9 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OrderSkeleton;
