import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const OfficialBookSkeleton = () => {
  return (
    <section className="relative z-10 py-6">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-6">
          <Skeleton className="h-8 w-2/3 mx-auto mb-3" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>

        <Card className="relative bg-white/90 backdrop-blur-md shadow-lg overflow-hidden p-0">
          {/* Book cover background skeleton */}
          <Skeleton className="h-48 w-full" />
          
          {/* Content skeleton */}
          <div className="relative z-10 p-6 -mt-10 bg-white/90 backdrop-blur-md rounded-t-3xl">
            <div className="text-center space-y-4">
              <div className="mb-4">
                <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
              </div>
              
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mx-auto" />
                <Skeleton className="h-4 w-4/5 mx-auto" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-center space-x-4">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <Skeleton className="h-6 w-24 mx-auto" />
              </div>

              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};