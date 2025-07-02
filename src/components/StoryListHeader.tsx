
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface StoryListHeaderProps {
  topicId: string;
  sectionName: string;
  storiesCount: number;
  headerVisible: boolean;
  headerRef: React.RefObject<HTMLElement>;
}

const StoryListHeader = ({ 
  topicId, 
  sectionName, 
  storiesCount, 
  headerVisible, 
  headerRef 
}: StoryListHeaderProps) => {
  const headerBackgroundImage = "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=300&fit=crop";

  return (
    <header 
      ref={headerRef} 
      className={`relative flex items-center mb-6 p-6 rounded-lg overflow-hidden transition-all duration-1000 -mx-4 -mt-4 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{
        backgroundImage: `url(${headerBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Half-saturated overlay */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center w-full">
        <Link to={`/topic/${topicId}/sections`} className="mr-4">
          <Button variant="ghost" size="sm" className="text-[#5a7a85] hover:bg-white/20">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-black">{sectionName}</h1>
          <p className="text-sm text-gray-700 mt-1">{storiesCount} stories</p>
        </div>
      </div>
    </header>
  );
};

export default StoryListHeader;
