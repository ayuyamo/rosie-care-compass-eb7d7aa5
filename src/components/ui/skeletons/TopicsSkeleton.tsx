import { Skeleton } from "@/components/ui/skeleton";

export const TopicsSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 pb-40">

      {/* Header Skeleton */}
      <header className="flex flex-wrap items-center mb-6">
        <Skeleton className="w-8 h-8 rounded mr-4" />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Skeleton className="h-7 w-full mb-1" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </header>

      {/* Topic Cards Skeleton */}
      <div className="space-y-6">
        {[1, 2, 3].map((index) => (
          <div key={index} className="bg-white/90 rounded-lg shadow-lg overflow-hidden">
            {/* Image Skeleton */}
            <Skeleton className="w-full h-48" />

            {/* Content Skeleton */}
            <div className="p-6 space-y-4">
              <Skeleton className="h-6 w-3/4" />

              {/* Stories Badges Skeleton */}
              <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>

              {/* Button Skeleton */}
              <div className="flex justify-end pt-2">
                <Skeleton className="h-8 w-28" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};