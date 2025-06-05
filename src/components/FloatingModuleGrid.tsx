
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Compass, MessageCircle, Home, Shield, Heart, Scale, ArrowRight, BookOpen, Sparkles, ChevronDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const caregivingModules = [
  {
    id: "new-to-caregiving",
    title: "New Beginnings",
    description: "Your first steps into caregiving",
    icon: Compass,
    color: "#dab216",
    stories: ["Reluctantly", "Obligatory", "Overwhelmed"],
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=120&fit=crop"
  },
  {
    id: "conflicts",
    title: "Navigating Tensions",
    description: "Resolving caregiving conflicts with grace",
    icon: MessageCircle,
    color: "#679aa3",
    stories: ["Timeliness", "Money Matters", "Family Dynamics"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=120&fit=crop"
  },
  {
    id: "housing",
    title: "Finding Home",
    description: "Housing decisions that matter",
    icon: Home,
    color: "#2b6cb0",
    stories: ["Not in the Same City", "Shared Housing"],
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=200&h=120&fit=crop"
  },
  {
    id: "safety",
    title: "Guardian Angels",
    description: "Ensuring safety and security",
    icon: Shield,
    color: "#373618",
    stories: ["Financial Obstacles", "Hazard Falls"],
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=200&h=120&fit=crop"
  }
];

export const FloatingModuleGrid = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <section className="relative z-10 py-6">
      <div className="max-w-md mx-auto px-4">
        <div ref={titleRef} className={`text-center mb-6 transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 bg-[#679aa3]/20 rounded-full px-4 py-2 mb-4">
            <Sparkles className="h-5 w-5 text-[#dab216]" />
            <span className="text-[#dab216] font-bold text-sm">Care Modules</span>
          </div>
          <h3 className="text-2xl font-black text-[#dab216] mb-3">
            Explore Your Journey
          </h3>
          <p className="text-[#679aa3] text-sm">
            Discover resources tailored to your caregiving path
          </p>
        </div>

        <div ref={gridRef} className="space-y-4">
          {caregivingModules.map((module, index) => {
            const IconComponent = module.icon;
            const isSelected = selectedModule === module.id;
            const animationDelay = gridVisible ? index * 200 : 0;
            
            return (
              <div
                key={module.id}
                className={`transition-all duration-700 transform ${
                  gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ animationDelay: `${animationDelay}ms` }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-500 bg-[#232323]/60 backdrop-blur-md border border-[#dab216]/30 shadow-xl hover:shadow-2xl overflow-hidden ${
                    isSelected ? 'ring-2 ring-[#dab216]/50' : ''
                  }`}
                  onClick={() => setSelectedModule(isSelected ? null : module.id)}
                >
                  <div className="relative">
                    <img 
                      src={module.image} 
                      alt={module.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#232323]/80 to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <div className="p-2 rounded-xl" style={{ backgroundColor: module.color }}>
                        <IconComponent className="h-5 w-5 text-[#232323]" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <ChevronDown className={`h-5 w-5 text-[#dab216] transition-transform duration-300 ${
                        isSelected ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-[#dab216]">{module.title}</CardTitle>
                    <CardDescription className="text-[#679aa3] text-sm">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  
                  {isSelected && (
                    <CardContent className="pt-0 animate-fade-in">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-bold text-[#dab216] mb-3 text-sm">Featured Stories:</h4>
                          <div className="space-y-2">
                            {module.stories.map((story) => (
                              <div key={story} className="bg-[#232323]/40 backdrop-blur-sm p-3 rounded-xl border border-[#679aa3]/20 hover:bg-[#232323]/60 transition-colors cursor-pointer">
                                <div className="flex items-center justify-between">
                                  <span className="text-[#dab216] font-medium text-sm">{story}</span>
                                  <ArrowRight className="h-4 w-4 text-[#679aa3]" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Button className="w-full text-[#232323] font-bold py-3 rounded-xl transform hover:scale-105 transition-all duration-300" style={{ backgroundColor: module.color }}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          Explore Module
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
