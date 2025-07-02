
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface SectionHeaderProps {
  sectionName: string;
  storiesCount: number;
  isVisible: boolean;
  headerRef: React.RefObject<HTMLDivElement>;
  topicId: string;
}

export const SectionHeader = ({ sectionName, storiesCount, isVisible, headerRef, topicId }: SectionHeaderProps) => {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div ref={headerRef} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-4 mb-2">
            <Link to={`/topic/${topicId}/sections`}>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sections
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">{sectionName}</h1>
          </div>
          <p className="text-gray-600 text-lg ml-32">{storiesCount} inspiring stories to discover</p>
        </div>
      </div>
    </div>
  );
};
