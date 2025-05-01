import { Card, CardContent } from "@/components/ui/card";

function SkeletonDiv({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
    />
  );
}

export default function UsersLoading() {
  return (
    <div className="space-y-6 w-[85%] mx-auto">
      <SkeletonDiv className="h-10 w-48" />

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <SkeletonDiv className="h-10 w-full sm:w-96" />
        <SkeletonDiv className="h-10 w-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <SkeletonDiv className="h-10 w-10 rounded-full" />
                  <div>
                    <SkeletonDiv className="h-5 w-32 mb-1" />
                    <SkeletonDiv className="h-4 w-40" />
                  </div>
                </div>
                <SkeletonDiv className="h-8 w-8 rounded-md" />
              </div>
              <div className="flex gap-2 mb-4">
                <SkeletonDiv className="h-6 w-20 rounded-full" />
                <SkeletonDiv className="h-6 w-20 rounded-full" />
              </div>
              <div className="space-y-2">
                <SkeletonDiv className="h-4 w-32" />
                <SkeletonDiv className="h-4 w-40" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <SkeletonDiv className="h-5 w-48" />
        <div className="flex items-center space-x-2">
          <SkeletonDiv className="h-8 w-8 rounded-md" />
          <SkeletonDiv className="h-5 w-24" />
          <SkeletonDiv className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  );
}
