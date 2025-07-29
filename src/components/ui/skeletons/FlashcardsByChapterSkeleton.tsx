import { Skeleton } from "@/components/ui/skeleton";

export const FlashcardsByChapterSkeleton = () => {
  return (
    <div className="min-h-screen bg-background p-6 space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center mb-6">
        <Skeleton className="h-10 w-10 mr-4 flex-shrink-0" />
        <Skeleton className="h-8 w-48" />
      </div>

      {/* Progress bar skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="flex-1 h-4 rounded-full" />
        <Skeleton className="h-4 w-12" />
      </div>

      {/* Flashcard skeleton */}
      <div className="space-y-6">
        <div className="relative p-14 border rounded-lg shadow">
          <Skeleton className="absolute top-3 right-3 h-6 w-6 rounded-full" />
          <div className="text-center space-y-4">
            <Skeleton className="h-6 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>
        </div>

        {/* Action buttons skeleton */}
        <div className="flex justify-between space-x-4">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
};