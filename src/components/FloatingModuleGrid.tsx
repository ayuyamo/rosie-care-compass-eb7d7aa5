import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, BookOpen, Users, MessageCircle, Compass, Shield, Home, Scale, ArrowRight, Sparkles, FolderClosed } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const modules = [
  {
    category: "Planning",
    title: "New to Caregiving",
    description: "Facing new challenges",
    icon: Compass,
    color: "#BDB76B",
    bgColor: "bg-white/60",
    borderColor: "border-gray-200"
  },
  {
    category: "Communication",
    title: "Conflicts",
    description: "Resolving caregiving tensions",
    icon: MessageCircle,
    color: "#8F9779",
    bgColor: "bg-white/60",
    borderColor: "border-gray-200"
  },
  {
    category: "Planning",
    title: "Housing",
    description: "Navigating housing decisions",
    icon: Home,
    color: "#679aa3",
    bgColor: "bg-white/60",
    borderColor: "border-gray-200"
  },
  {
    category: "Safety",
    title: "Safety",
    description: "Ensuring caregiving safety",
    icon: Shield,
    color: "#999999",
    bgColor: "bg-white/60",
    borderColor: "border-gray-200"
  },
  {
    category: "Wellness",
    title: "Dependence",
    description: "Coping with dependence",
    icon: Heart,
    color: "#CC9999",
    bgColor: "bg-white/60",
    borderColor: "border-gray-200"
  },
  {
    category: "Wellness",
    title: "Self-Care",
    description: "Caring for yourself too",
    icon: Sparkles,
    color: "#c3b4a4",
    bgColor: "bg-white/60",
    borderColor: "border-gray-200"
  }
];

export const FloatingModuleGrid = () => {
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
            const IconComponent = module.icon;

            return (
              <Card key={module.title} className={`${module.bgColor} backdrop-blur-md border ${module.borderColor} p-4 text-center`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: module.color }}>
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
