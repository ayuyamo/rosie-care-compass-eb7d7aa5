import { Skeleton } from "@/components/ui/skeleton";

export const ResourcesDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header Skeleton */}
        <header className="flex items-center mb-6">
          <Skeleton className="w-8 h-8 rounded mr-4" />
          <div>
            <Skeleton className="h-7 w-56 mb-1" />
            <Skeleton className="h-4 w-32" />
          </div>
        </header>

        {/* Topic Resource Cards Skeleton */}
        <div className="space-y-6">
          {[1, 2, 3].map((index) => (
            <div key={index} className="bg-white/90 rounded-lg shadow-lg p-6">
              <div className="space-y-4">
                {/* Section Header */}
                <div className="flex items-start space-x-4">
                  <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                </div>

                {/* Resources List Skeleton */}
                <div className="space-y-2 ml-6">
                  {[1, 2].map((resourceIndex) => (
                    <div key={resourceIndex} className="p-2 rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-4 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};