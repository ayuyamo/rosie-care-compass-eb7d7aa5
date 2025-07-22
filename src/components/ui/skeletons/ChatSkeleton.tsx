import { Skeleton } from "@/components/ui/skeleton";

export const ChatSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f2d0] via-[#e8e5e0] to-[#d6e5f0] flex flex-col">
      {/* Header Skeleton */}
      <header className="p-4 bg-white/80 backdrop-blur-md border-b border-[#c4a91a]/20">
        <div className="max-w-md mx-auto flex items-center">
          <Skeleton className="w-8 h-8 rounded mr-4" />
          <div className="flex items-center space-x-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div>
              <Skeleton className="h-5 w-20 mb-1" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </header>

      {/* Messages Skeleton */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <div className={`flex items-start space-x-2 max-w-xs ${index % 2 === 0 ? '' : 'flex-row-reverse space-x-reverse'}`}>
                <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                <div className="bg-white/80 rounded-lg p-3 shadow-md">
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Skeleton */}
      <div className="p-4 bg-white/80 backdrop-blur-md border-t border-[#c4a91a]/20">
        <div className="max-w-md mx-auto flex space-x-2">
          <Skeleton className="flex-1 h-10 rounded-md" />
          <Skeleton className="w-10 h-10 rounded-md" />
        </div>
      </div>
    </div>
  );
};