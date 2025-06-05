
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ModuleCardProps {
  module: {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    stories: string[];
  };
  isSelected: boolean;
  onSelect: () => void;
}

export const ModuleCard = ({ module, isSelected, onSelect }: ModuleCardProps) => {
  const IconComponent = module.icon;

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg cursor-pointer ${
      isSelected ? 'ring-2 ring-rose-300 shadow-lg' : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-lg ${module.color}`}>
            <IconComponent className="h-6 w-6" />
          </div>
          <button onClick={onSelect} className="text-gray-400 hover:text-gray-600">
            {isSelected ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
        <CardTitle className="text-lg">{module.title}</CardTitle>
        <CardDescription className="text-sm">{module.description}</CardDescription>
      </CardHeader>
      
      {isSelected && (
        <CardContent className="pt-0 animate-fade-in">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Featured Stories:</h4>
              <div className="space-y-2">
                {module.stories.map((story) => (
                  <div key={story} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm text-gray-600">{story}</span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <Badge variant="outline" className="justify-center">Stories</Badge>
              <Badge variant="outline" className="justify-center">Resources</Badge>
              <Badge variant="outline" className="justify-center">Questions</Badge>
            </div>
            <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white" size="sm">
              Explore Module
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
