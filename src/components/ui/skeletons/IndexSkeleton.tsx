import { Skeleton } from "@/components/ui/skeleton";
import { CreativeStorySkeleton } from "@/components/ui/skeletons";


export const IndexSkeleton = () => {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Header Skeleton */}
      <header className="relative z-50 p-4 bg-white/90 backdrop-blur-md border-b border-gray-200/30">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-3 pb-2 min-w-0 w-full">
            <Skeleton className="w-12 h-12 rounded-xl" />
            <div className="flex flex-col min-w-0 w-full">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-1/2 mt-1" />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Skeleton className="w-9 h-9 rounded-lg" />
            <Skeleton className="w-9 h-9 rounded-lg" />
          </div>
        </div>
      </header>

      {/* Hero Section Skeleton */}
      <section className="relative z-10 py-8">
        <div className="px-4">
          <div className="text-center">
            <div className="relative bg-gray-100 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Skeleton className="w-24 h-24 rounded-full mx-auto" />
                </div>
                <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-4 w-full mx-auto mb-2" />
                <Skeleton className="h-4 w-4/5 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CreativeStorySkeleton />
    </div>
  );
};