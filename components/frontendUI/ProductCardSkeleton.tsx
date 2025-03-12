export function ProductCardSkeleton() {
  return (
    <>
      {[...Array(3).keys()].map((id) => (
        <div
          className="animate-pulse group relative bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-shadow"
          key={id}
        >
          <div className="relative h-64 bg-gray-100"></div>
          <div className="p-4">
            <div className="h-6 bg-gray-100 rounded mb-2"></div>
            <div className="h-4 bg-gray-100 rounded mb-2"></div>
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-100 rounded w-1/3"></div>
            </div>
            <div className="w-full mt-4 h-10 bg-gray-100 rounded-md"></div>
          </div>
        </div>
      ))}
    </>
  );
}
