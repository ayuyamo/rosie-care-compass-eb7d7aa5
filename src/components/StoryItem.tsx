
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import ShareButtons from "./ShareButtons";

interface Story {
  id: string;
  title: string;
  content: string;
}

interface StoryItemProps {
  story: Story;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  gridVisible: boolean;
  hasLoaded: boolean;
  randomColor: string;
}

const StoryItem = ({ 
  story, 
  index, 
  isOpen, 
  onToggle, 
  gridVisible, 
  hasLoaded, 
  randomColor 
}: StoryItemProps) => {
  const getStoryPreview = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + "...";
  };

  const storyPreview = getStoryPreview(story.content);

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <article className={`
        bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-700
        ${gridVisible && hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
      `}
        style={{
          transitionDelay: gridVisible && hasLoaded ? `${index * 150}ms` : '0ms'
        }}>

        {/* Story Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#232323] mb-2">
                {story.title}
              </h2>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-auto">
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>

        {/* Story Content */}
        <div className="px-6 py-4">
          <div className="prose prose-gray max-w-none">
            <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base">
              {isOpen ? story.content : storyPreview}
            </div>
          </div>
          {story.content.length > 200 && !isOpen && (
            <CollapsibleTrigger asChild>
              <Button variant="link" className="mt-2 p-0 h-auto text-sm" style={{ color: randomColor }}>
                Read more
              </Button>
            </CollapsibleTrigger>
          )}
        </div>

        {/* Story Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-end">
            <ShareButtons storyTitle={story.title} storyContent={story.content} />
          </div>
        </div>
      </article>
    </Collapsible>
  );
};

export default StoryItem;
