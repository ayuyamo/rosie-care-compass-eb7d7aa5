
import { ExternalLink } from "lucide-react";

interface Resource {
  id: string;
  url: string;
  image?: string;
}

interface ResourcesSectionProps {
  resources: Resource[];
}

export const ResourcesSection = ({ resources }: ResourcesSectionProps) => {
  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Additional Resources</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md group"
          >
            {resource.image ? (
              <img
                src={resource.image}
                alt={resource.url}
                className="h-6 w-6 rounded-full flex-shrink-0"
              />
            ) : (
              <ExternalLink className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-600" />
            )}
            <span className="truncate text-gray-700 group-hover:text-gray-900">
              {new URL(resource.url).hostname}
            </span>
            <ExternalLink className="h-4 w-4 flex-shrink-0 opacity-40 group-hover:opacity-70" />
          </a>
        ))}
      </div>
    </div>
  );
};
