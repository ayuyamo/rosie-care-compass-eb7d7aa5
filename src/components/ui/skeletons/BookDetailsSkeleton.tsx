import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const BookDetailsSkeleton = () => {
  return (
    <div className="min-h-screen p-4 pb-40">

      {/* Header skeleton */}
      <header className="flex items-center mb-6">
        <Skeleton className="w-8 h-8 rounded mr-4 flex-shrink-0" />
        <Skeleton className="h-7 w-48" />
      </header>

      {/* Book Overview Card skeleton */}
      <Card className="relative bg-white/90 backdrop-blur-md shadow-lg overflow-hidden p-0 mb-6">
        {/* Book cover background skeleton */}
        <Skeleton className="h-48 w-full" />

        {/* Content skeleton */}
        <div className="relative z-10 p-6 -mt-10 bg-white/90 backdrop-blur-md rounded-t-3xl">
          <div className="text-center mb-6">
            <div className="mb-4">
              <Skeleton className="h-5 w-3/4 mx-auto mb-1" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>

            <div className="space-y-2 mb-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6 mx-auto" />
              <Skeleton className="h-4 w-4/5 mx-auto" />
            </div>

            {/* Edition tabs skeleton */}
            <div className="mb-6">
              <div className="flex border-b border-gray-200">
                <Skeleton className="h-8 w-24 mr-2" />
                <Skeleton className="h-8 w-20" />
              </div>
              <div className="pt-4">
                <Skeleton className="h-6 w-20 mx-auto" />
              </div>
            </div>

            {/* Button skeleton */}
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </Card>

      {/* Book Details dropdown skeleton */}
      <div className="mb-6 rounded-lg">
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>

      {/* Table of Contents skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-md p-4">
              <div className="flex items-start space-x-3">
                <Skeleton className="w-8 h-8 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};