import { Skeleton } from "@/components/ui/skeleton";

export const FlashcardsSkeleton = () => {
  return (
    <div className="min-h-screen bg-background p-6 pb-24 max-w-md mx-auto space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center mb-6">
        <Skeleton className="h-10 w-10 mr-4" />
        <Skeleton className="h-8 w-32" />
      </div>

      {/* Chapter cards skeleton */}
      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-card border rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-4">
              <Skeleton className="h-16 w-16 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};