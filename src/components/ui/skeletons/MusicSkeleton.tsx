import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const MusicSkeleton = () => {
  return (
    <section className="py-8 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <Skeleton className="w-10 h-10 rounded-full mr-3" />
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Card key={index} className="border border-gray-200/50 shadow-lg">
              <CardContent className="p-4">
                <div className="flex flex-col items-center space-y-3">
                  <Skeleton className="w-8 h-8" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <div className="bg-[#f8f9f6] rounded-2xl p-4 border border-[#e4e8e1]">
            <Skeleton className="w-6 h-6 mx-auto mb-2" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};