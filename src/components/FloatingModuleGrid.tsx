
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, BookOpen, Users, MessageCircle, Compass, Shield, Home, Scale, ArrowRight, Sparkles, FolderClosed } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Default colors for modules
const colors = [
  "#BDB76B", "#8F9779", "#679aa3", "#999999", "#CC9999", "#c3b4a4",
  "#d79a8c", "#367588", "#49796B", "#5a7a85", "#B8860B", "#8B4513"
];

// Default icons for modules
const defaultIcons = [
  Compass, MessageCircle, Home, Shield, Heart, Sparkles,
  BookOpen, Users, Scale, ArrowRight
];

const getConsistentColor = (title: string): string => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const getConsistentIcon = (title: string) => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % defaultIcons.length;
  return defaultIcons[index];
};

const defaultModules = [
  {
    title: "New to Caregiving",
    description: "Facing new challenges",
  },
  {
    title: "Conflicts",
    description: "Resolving caregiving tensions",
  },
  {
    title: "Housing",
    description: "Navigating housing decisions",
  },
  {
    title: "Safety",
    description: "Ensuring caregiving safety",
  },
  {
    title: "Dependence",
    description: "Coping with dependence",
  },
  {
    title: "Self-Care",
    description: "Caring for yourself too",
  }
];

interface FloatingModuleGridProps {
  modules?: Array<{
    title: string;
    description: string;
  }>;
}

export const FloatingModuleGrid = ({ modules = defaultModules }: FloatingModuleGridProps) => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <section className="relative z-10 py-6">
      <div className="max-w-md mx-auto px-4">
        <h3 ref={titleRef} className={`text-xl font-bold text-[#232323] mb-4 transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Resources
        </h3>

        <div ref={gridRef} className={`grid grid-cols-2 gap-4 mb-4 transition-all duration-1000 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
          {modules.map((module, index) => {
            const color = getConsistentColor(module.title);
            const IconComponent = getConsistentIcon(module.title);

            return (
              <Card key={module.title} className="bg-white/60 backdrop-blur-md border border-gray-200 p-4 text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: color }}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-[#232323] font-bold text-sm mb-1">{module.title}</h4>
                <p className="text-[#373618] text-xs">{module.description}</p>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/resources">
            <Button className="w-full bg-[#989827a4] text-white text-sm font-bold py-3 rounded-2xl">
              <FolderClosed className="mr-2 h-5 w-5" />
              Explore Resources
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
