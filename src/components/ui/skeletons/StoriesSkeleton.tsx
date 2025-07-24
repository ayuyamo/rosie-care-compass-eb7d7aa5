import { Skeleton } from "@/components/ui/skeleton";

export const StoriesSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header Skeleton */}
        <header className="relative flex items-center mb-6 p-6 rounded-lg overflow-hidden">
          <Skeleton className="w-8 h-8 rounded mr-4" />
          <div>
            <Skeleton className="h-7 w-48 mb-1" />
            <Skeleton className="h-4 w-20" />
          </div>
        </header>

        {/* Image Section Skeleton */}
        <div className="relative mb-8 p-10 flex items-center justify-center bg-gray-200 rounded">
          <div className="relative z-10 text-center">
            <Skeleton className="h-1 w-14 mx-auto mb-2" />
            <Skeleton className="h-1 w-14 mx-auto" />
          </div>
        </div>

        {/* Story Cards Skeleton */}
        <div className="space-y-8">
          {[1, 2, 3].map((index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Story Header */}
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <div className="flex gap-2 mt-3">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </div>
                  </div>
                  <Skeleton className="w-8 h-8 rounded" />
                </div>
              </div>

              {/* Story Content */}
              <div className="px-6 py-4">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <Skeleton className="h-4 w-16" />
              </div>

              {/* Story Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-end">
                  <Skeleton className="h-4 w-20 mr-3" />
                  <Skeleton className="w-9 h-9 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};