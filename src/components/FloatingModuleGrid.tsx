
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, BookOpen, Users, MessageCircle, Compass, Shield, Home, Scale, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const modules = [
  {
    category: "Care Planning",
    title: "Daily Routines",
    description: "Organize care schedules and daily activities",
    icon: Compass,
    color: "#5a7a85",
    bgColor: "bg-white/60",
    borderColor: "border-gray-200"
  },
  {
    category: "Safety",
    title: "Home Safety",
    description: "Create secure environments for loved ones",
    icon: Shield,
    color: "#4a90a4",
    bgColor: "bg-white/60",
    borderColor: "border-gray-200"
  },
  {
    category: "Legal",
    title: "Documentation",
    description: "Navigate important legal requirements",
    icon: Scale,
    color: "#7a8a60",
    bgColor: "bg-white/60",
    borderColor: "border-gray-200"
  },
  {
    category: "Communication",
    title: "Family Connect",
    description: "Improve family and healthcare communication",
    icon: MessageCircle,
    color: "#5a7a85",
    bgColor: "bg-white/60",
    borderColor: "border-gray-200"
  },
  {
    category: "Wellness",
    title: "Self-Care",
    description: "Maintain your wellbeing while caregiving",
    icon: Heart,
    color: "#4a90a4",
    bgColor: "bg-white/60",
    borderColor: "border-gray-200"
  },
  {
    category: "Support",
    title: "Community",
    description: "Connect with other caregivers",
    icon: Users,
    color: "#7a8a60",
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
          Guided Care Tools
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
          <Link to="/modules">
            <Button className="w-full bg-[#2b6cb0] text-white py-3 rounded-2xl">
              Explore All Modules
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
