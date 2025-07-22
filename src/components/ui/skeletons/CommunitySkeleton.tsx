import { Skeleton } from "@/components/ui/skeleton";

export const CommunitySkeleton = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header Skeleton */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Skeleton className="w-8 h-8 rounded mr-4" />
            <Skeleton className="h-7 w-28" />
          </div>
          <Skeleton className="h-8 w-16 rounded" />
        </header>

        {/* Popular Groups Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-6 w-32 mb-3" />
          <div className="space-y-2">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white/80 rounded border p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-7 w-12 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Posts Skeleton */}
        <div>
          <Skeleton className="h-6 w-28 mb-3" />
          <div className="space-y-4">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white/80 rounded border shadow-md p-4">
                {/* Post Header */}
                <div className="flex items-center space-x-3 mb-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-5 w-14 rounded-full" />
                    </div>
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>

                {/* Post Actions */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-3 w-6" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-3 w-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};