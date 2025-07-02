
import { Heart } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Heart className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No stories found</h3>
      <p className="text-gray-600">This section doesn't have any stories yet.</p>
    </div>
  );
};
