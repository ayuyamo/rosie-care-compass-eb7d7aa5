
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { SocialShareButtons } from "./SocialShareButtons";

interface Story {
  id: string;
  title: string;
  content: string;
}

interface StoryCardAltProps {
  story: Story;
  index: number;
  isOpen: boolean;
  onToggle: (storyId: string) => void;
  isVisible: boolean;
  hasLoaded: boolean;
  storyColor: string;
}

export const StoryCardAlt = ({ 
  story, 
  index, 
  isOpen, 
  onToggle, 
  isVisible, 
  hasLoaded, 
  storyColor 
}: StoryCardAltProps) => {
  const getStoryPreview = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + "...";
  };

  const storyPreview = getStoryPreview(story.content);

  return (
    <Collapsible open={isOpen} onOpenChange={() => onToggle(story.id)}>
      <Card className={`
        overflow-hidden transition-all duration-700 hover:shadow-xl hover:scale-[1.02] group
        ${isOpen ? 'h-auto' : 'h-80'} flex flex-col
        ${isVisible && hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
      `}
        style={{
          transitionDelay: isVisible && hasLoaded ? `${index * 100}ms` : '0ms'
        }}>
        
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {story.title}
              </h2>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-2 shrink-0">
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
          </div>

          <div className={`${isOpen ? 'mb-4' : 'flex-1 flex flex-col mb-3'}`}>
            <p className={`text-gray-700 text-sm leading-relaxed whitespace-pre-wrap ${isOpen ? '' : 'flex-1 overflow-hidden'}`}>
              {isOpen ? story.content : storyPreview}
            </p>
            {story.content.length > 100 && !isOpen && (
              <CollapsibleTrigger asChild>
                <Button variant="link" className="mt-2 p-0 h-auto text-xs font-medium self-start" style={{ color: storyColor }}>
                  Read full story
                </Button>
              </CollapsibleTrigger>
            )}
          </div>

          <div className="mt-auto">
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600">Share:</span>
                <div className="flex items-center space-x-1">
                  {/* Simplified share buttons for better fit */}
                  <SocialShareButtons storyTitle={story.title} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Collapsible>
  );
};
