import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const OfficialBookSkeleton = () => {
  return (
    <section className="relative z-10 py-6">
      <div className="max-w-md mx-auto px-4">
        <Skeleton className="h-6 w-32 mb-4" />
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer rounded-xl overflow-hidden flex flex-col h-[450px]">
          {/* Top: image skeleton with fixed height */}
          <div className="basis-1/3 max-h-[200px]">
            <Skeleton className="w-full h-full" />
          </div>

          {/* Bottom: text content skeleton */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <Skeleton className="h-5 w-3/4 mb-2" />
              <div className="space-y-2 mb-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Skeleton className="h-8 w-28" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};