
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Compass, MessageCircle, Home, Shield, Heart, Scale, ArrowRight, BookOpen, Sparkles, ChevronDown } from "lucide-react";

const caregivingModules = [
  {
    id: "new-to-caregiving",
    title: "New Beginnings",
    description: "Your first steps into caregiving",
    icon: Compass,
    gradient: "from-emerald-400 to-teal-500",
    stories: ["Reluctantly", "Obligatory", "Overwhelmed"],
    position: "top-4 left-4"
  },
  {
    id: "conflicts",
    title: "Navigating Tensions",
    description: "Resolving caregiving conflicts with grace",
    icon: MessageCircle,
    gradient: "from-amber-400 to-orange-500",
    stories: ["Timeliness", "Money Matters", "Family Dynamics"],
    position: "top-4 right-4"
  },
  {
    id: "housing",
    title: "Finding Home",
    description: "Housing decisions that matter",
    icon: Home,
    gradient: "from-blue-400 to-cyan-500",
    stories: ["Not in the Same City", "Shared Housing"],
    position: "top-1/3 left-1/2 transform -translate-x-1/2"
  },
  {
    id: "safety",
    title: "Guardian Angels",
    description: "Ensuring safety and security",
    icon: Shield,
    gradient: "from-red-400 to-rose-500",
    stories: ["Financial Obstacles", "Hazard Falls"],
    position: "bottom-1/3 left-8"
  },
  {
    id: "dependence",
    title: "Embracing Change",
    description: "Growing together through dependence",
    icon: Heart,
    gradient: "from-purple-400 to-pink-500",
    stories: ["Independence vs Safety", "Role Reversal"],
    position: "bottom-1/3 right-8"
  },
  {
    id: "legal",
    title: "Legal Compass",
    description: "Understanding your responsibilities",
    icon: Scale,
    gradient: "from-indigo-400 to-purple-500",
    stories: ["Power of Attorney", "Healthcare Directives"],
    position: "bottom-4 left-1/4"
  }
];

export const FloatingModuleGrid = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 bg-blue-400/20 rounded-full px-6 py-3 mb-8">
            <Sparkles className="h-6 w-6 text-blue-300" />
            <span className="text-blue-200 font-bold text-lg">Caregiving Cosmos</span>
          </div>
          <h3 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 mb-6">
            Explore Your Universe
          </h3>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Each floating module represents a different dimension of your caregiving journey. 
            Click to dive deeper into stories, resources, and wisdom.
          </p>
        </div>

        <div className="relative h-[800px] max-w-6xl mx-auto">
          {caregivingModules.map((module, index) => {
            const IconComponent = module.icon;
            const isSelected = selectedModule === module.id;
            const isHovered = hoveredModule === module.id;
            
            return (
              <div
                key={module.id}
                className={`absolute transition-all duration-500 transform ${
                  isSelected || isHovered ? 'scale-110 z-20' : 'z-10'
                }`}
                style={{
                  top: `${(index * 15) % 60}%`,
                  left: `${(index * 25) % 80}%`,
                  transform: `translate(-50%, -50%) ${isSelected ? 'scale(1.1)' : ''}`
                }}
                onMouseEnter={() => setHoveredModule(module.id)}
                onMouseLeave={() => setHoveredModule(null)}
              >
                <Card 
                  className={`w-80 cursor-pointer transition-all duration-500 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:shadow-3xl ${
                    isSelected ? 'ring-4 ring-white/30' : ''
                  }`}
                  onClick={() => setSelectedModule(isSelected ? null : module.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${module.gradient} shadow-xl`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <button className="text-white/60 hover:text-white transition-colors">
                        <ChevronDown className={`h-6 w-6 transition-transform duration-300 ${
                          isSelected ? 'rotate-180' : ''
                        }`} />
                      </button>
                    </div>
                    <CardTitle className="text-2xl text-white">{module.title}</CardTitle>
                    <CardDescription className="text-purple-200 text-lg">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  
                  {isSelected && (
                    <CardContent className="pt-0 animate-fade-in">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-bold text-white mb-4 text-lg">Featured Stories:</h4>
                          <div className="space-y-3">
                            {module.stories.map((story) => (
                              <div key={story} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                <div className="flex items-center justify-between">
                                  <span className="text-white font-medium">{story}</span>
                                  <ArrowRight className="h-5 w-5 text-purple-300" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <Badge className="justify-center bg-white/20 text-white border-white/30">Stories</Badge>
                          <Badge className="justify-center bg-white/20 text-white border-white/30">Resources</Badge>
                          <Badge className="justify-center bg-white/20 text-white border-white/30">Wisdom</Badge>
                        </div>
                        <Button className={`w-full bg-gradient-to-r ${module.gradient} hover:shadow-xl text-white py-3 rounded-xl transform hover:scale-105 transition-all duration-300`}>
                          <BookOpen className="mr-2 h-5 w-5" />
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
