import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const CreativeStorySkeleton = () => {
  return (
    <section className="relative z-10 py-6">
      <div className="px-4">
        <div className="text-center mb-6">
          <Skeleton className="h-8 w-3/4 mx-auto mb-3" />
          <Skeleton className="h-4 w-2/3 mx-auto" />
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-md shadow-lg overflow-hidden">
              {/* Image skeleton */}
              <Skeleton className="h-48 w-full" />

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 items-start">
                      <Skeleton className="h-4 w-12 mr-2" />
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-14" />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Skeleton className="h-8 w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-6">
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </section>
  );
};