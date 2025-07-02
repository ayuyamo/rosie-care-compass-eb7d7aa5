
import { ExternalLink } from "lucide-react";

interface Resource {
  id: string;
  url: string;
  image?: string;
}

interface ResourcesListProps {
  resources: Resource[];
}

const ResourcesList = ({ resources }: ResourcesListProps) => {
  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-gray-700">
        Resources
      </p>
      <div className="flex flex-wrap gap-3">
        {resources.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md group"
          >
            {resource.image ? (
              <>
                <img
                  src={resource.image}
                  alt={resource.url}
                  className="h-5 w-5 rounded-full flex-shrink-0"
                />
                <span className="truncate max-w-32 group-hover:text-blue-700">
                  {new URL(resource.url).hostname}
                </span>
                <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 opacity-60 group-hover:opacity-100" />
              </>
            ) : (
              <>
                <ExternalLink className="h-4 w-4 flex-shrink-0 text-gray-500 group-hover:text-blue-600" />
                <span className="truncate max-w-32 group-hover:text-blue-700">
                  {new URL(resource.url).hostname}
                </span>
              </>
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ResourcesList;
