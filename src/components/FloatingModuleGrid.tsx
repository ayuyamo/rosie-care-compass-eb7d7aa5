
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Compass, Shield, Home, Scale, Heart, Users, MessageCircle, ArrowRight, Clock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const modules = [
  {
    category: "Financial Planning",
    title: "Managing Care Costs",
    description: "Smart strategies for healthcare expenses",
    color: "#dab216",
    bgColor: "#dab216",
    borderColor: "border-gray-200",
    textColor: "#232323",
    icon: Scale,
    duration: "45 min",
    difficulty: "Beginner"
  },
  {
    category: "Home Safety",
    title: "Fall Prevention",
    description: "Creating a hazard-free environment",
    color: "#2b6cb0",
    bgColor: "#2b6cb0",
    borderColor: "border-gray-200",
    textColor: "#232323",
    icon: Shield,
    duration: "30 min",
    difficulty: "Intermediate"
  },
  {
    category: "Emotional Support",
    title: "Stress Management",
    description: "Techniques for caregiver well-being",
    color: "#679aa3",
    bgColor: "#679aa3",
    borderColor: "border-gray-200",
    textColor: "#232323",
    icon: Heart,
    duration: "60 min",
    difficulty: "Advanced"
  },
  {
    category: "Legal Guidance",
    title: "Understanding Legal Documents",
    description: "Power of attorney, healthcare directives",
    color: "#373618",
    bgColor: "#373618",
    borderColor: "border-gray-200",
    textColor: "#232323",
    icon: Compass,
    duration: "40 min",
    difficulty: "Beginner"
  }
];

export const FloatingModuleGrid = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <section className="relative z-10 py-6">
      <div className="max-w-md mx-auto px-4">
        <div ref={titleRef} className={`text-center mb-6 transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 bg-white/80 rounded-full px-4 py-2 mb-4 border border-gray-200">
            <Compass className="h-5 w-5  text-[#2b6cb0]" />
            <span className="font-bold text-sm text-[#232323]">Learning Modules</span>
          </div>
          <h3 className="text-2xl font-black mb-3 text-[#232323]">
            Build Your Skills
          </h3>
          <p className="text-sm text-[#373618]">
            Practical knowledge for better caregiving
          </p>
        </div>

        <div ref={gridRef} className="space-y-4">
          {modules.map((module, index) => (
            <div
              key={module.title}
              className={`group cursor-pointer transition-all duration-700 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
              style={{
                transitionDelay: gridVisible ? `${index * 150}ms` : '0ms'
              }}
            >
              <Card className={`bg-white/90 backdrop-blur-md border ${module.borderColor} shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: module.color }}>
                      <module.icon className="h-6 w-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="text-white border-white/30 text-xs" style={{ backgroundColor: module.color }}>
                          {module.category}
                        </Badge>
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span className="text-xs">{module.duration}</span>
                        </div>
                      </div>

                      <h4 className="text-lg font-bold mb-2 text-[#232323]">
                        {module.title}
                      </h4>
                      <p className="text-sm mb-4 text-[#373618]">
                        {module.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs" style={{ borderColor: module.color, color: module.color }}>
                          {module.difficulty}
                        </Badge>
                        <Button variant="ghost" size="sm" className="group/btn" style={{ color: module.color }}>
                          Start Module
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: '1s' }}>
          <Button className="w-full text-white font-bold py-3 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#679aa3' }}>
            <Heart className="mr-2 h-5 w-5" />
            Explore All Modules
          </Button>
        </div>
      </div>
    </section>
  );
};
