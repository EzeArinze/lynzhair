export function AnalyticsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg shadow-sm bg-white lg:mx-auto lg:w-[80%]"
        >
          <div className="flex flex-row items-center justify-between pb-2">
            <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
          <div className="h-8 w-32 bg-gray-300 rounded animate-pulse mb-2"></div>
          <div className="h-3 w-20 bg-gray-300 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  );
}
