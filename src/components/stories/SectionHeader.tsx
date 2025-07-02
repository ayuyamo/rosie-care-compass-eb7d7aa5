
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface SectionHeaderProps {
  sectionName: string;
  storiesCount: number;
  isVisible: boolean;
  headerRef: React.RefObject<HTMLDivElement>;
  topicId: string;
  heroImage: string;
}

export const SectionHeader = ({ sectionName, storiesCount, isVisible, headerRef, topicId, heroImage }: SectionHeaderProps) => {
  return (
    <div className="relative bg-white border-b border-gray-100 overflow-hidden">
      {/* Full background image */}
      <div className="absolute inset-0 opacity-10">
        <img
          src={heroImage}
          alt="Section background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative max-w-4xl mx-auto px-6 py-6">
        <div ref={headerRef} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-4 mb-2">
            <Link to={`/topic/${topicId}/sections`}>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{sectionName}</h1>
          </div>
          <p className="text-gray-600 text-base">{storiesCount} inspiring stories to discover</p>
        </div>
      </div>
    </div>
  );
};
