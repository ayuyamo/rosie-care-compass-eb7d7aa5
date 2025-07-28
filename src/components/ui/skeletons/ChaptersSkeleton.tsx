import { Skeleton } from "@/components/ui/skeleton";

export const ChaptersSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 pb-40">

      {/* Header Skeleton */}
      <header className="flex items-center mb-6">
        <Skeleton className="w-8 h-8 rounded mr-4" />
        <Skeleton className="h-7 w-48" />
      </header>

      {/* Chapter Cards Skeleton */}
      <div className="space-y-8">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="bg-white/90 rounded-lg shadow-lg overflow-hidden">
            {/* Image Skeleton */}
            <Skeleton className="w-full h-48" />

            {/* Content Skeleton */}
            <div className="p-6 space-y-4">
              <div>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-4/5" />
              </div>

              {/* Topics Badges Skeleton */}
              <div className="flex flex-wrap gap-2 items-start">
                <Skeleton className="h-3 w-12 mr-2" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>

              {/* Button Skeleton */}
              <div className="flex justify-end pt-2">
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};