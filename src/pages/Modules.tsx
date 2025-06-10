
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, BookOpen, Users, MessageCircle, Compass, Shield, Scale, Star, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Modules = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: modulesRef, isVisible: modulesVisible } = useScrollAnimation();

  const modules = [
    {
      id: 1,
      title: "Daily Care Planning",
      description: "Organize daily routines and care schedules",
      icon: Compass,
      color: "#dab216",
      category: "Planning",
      duration: "Interactive"
    },
    {
      id: 2,
      title: "Emergency Preparedness",
      description: "Be ready for unexpected situations",
      icon: Shield,
      color: "#2b6cb0",
      category: "Safety",
      duration: "Checklist"
    },
    {
      id: 3,
      title: "Legal Documentation",
      description: "Navigate important legal requirements",
      icon: Scale,
      color: "#679aa3",
      category: "Legal",
      duration: "Guide"
    },
    {
      id: 4,
      title: "Communication Tools",
      description: "Improve family and healthcare communication",
      icon: MessageCircle,
      color: "#373618",
      category: "Communication",
      duration: "Templates"
    },
    {
      id: 5,
      title: "Self-Care for Caregivers",
      description: "Maintain your own wellbeing while caring",
      icon: Heart,
      color: "#5a7a85",
      category: "Wellness",
      duration: "Activities"
    },
    {
      id: 6,
      title: "Community Connection",
      description: "Build support networks and find resources",
      icon: Users,
      color: "#4a90a4",
      category: "Support",
      duration: "Network"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 pb-24">
      <div className="max-w-md mx-auto">
        <header ref={headerRef} className={`flex items-center mb-6 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="sm" className="text-[#5a7a85]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#232323]">Care Modules</h1>
            <p className="text-[#373618] text-sm">Interactive tools and resources</p>
          </div>
        </header>

        <div ref={modulesRef} className="space-y-4">
          {modules.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <Card 
                key={module.id} 
                className={`
                  bg-white/90 backdrop-blur-md shadow-lg overflow-hidden group cursor-pointer transition-all duration-700 hover:shadow-xl
                  ${modulesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                `}
                style={{
                  transitionDelay: modulesVisible ? `${index * 100}ms` : '0ms'
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300" 
                      style={{ backgroundColor: module.color }}
                    >
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <Badge 
                          className="text-white border-white/30 text-xs" 
                          style={{ backgroundColor: module.color }}
                        >
                          {module.category}
                        </Badge>
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Star className="h-4 w-4" />
                          <span className="text-xs">{module.duration}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold mb-2 text-[#232323] group-hover:text-[#2b6cb0] transition-colors">
                        {module.title}
                      </h3>
                      <p className="text-sm mb-4 text-[#373618] leading-relaxed">
                        {module.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-[#679aa3]">
                          <Clock className="h-4 w-4" />
                          <span className="text-xs">Ready to use</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="group/btn" 
                          style={{ color: module.color }}
                        >
                          Start Module
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Modules;
