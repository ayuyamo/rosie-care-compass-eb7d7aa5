
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, BookOpen, Users, MessageCircle, Compass, Shield, Home, Scale, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const modules = [
  {
    category: "Care Planning",
    title: "Daily Routines",
    description: "Organize care schedules and daily activities",
    icon: Compass,
    color: "#dab216",
    bgColor: "bg-gradient-to-br from-yellow-400/20 to-orange-400/20",
    borderColor: "border-yellow-200",
    textColor: "#8b5a00"
  },
  {
    category: "Safety",
    title: "Home Safety",
    description: "Create secure environments for loved ones",
    icon: Shield,
    color: "#2b6cb0",
    bgColor: "bg-gradient-to-br from-blue-400/20 to-indigo-400/20",
    borderColor: "border-blue-200",
    textColor: "#1e3a8a"
  },
  {
    category: "Legal",
    title: "Documentation",
    description: "Navigate important legal requirements",
    icon: Scale,
    color: "#679aa3",
    bgColor: "bg-gradient-to-br from-teal-400/20 to-cyan-400/20",
    borderColor: "border-teal-200",
    textColor: "#0f766e"
  },
  {
    category: "Communication",
    title: "Family Connect",
    description: "Improve family and healthcare communication",
    icon: MessageCircle,
    color: "#373618",
    bgColor: "bg-gradient-to-br from-green-400/20 to-emerald-400/20",
    borderColor: "border-green-200",
    textColor: "#14532d"
  },
  {
    category: "Wellness",
    title: "Self-Care",
    description: "Maintain your wellbeing while caregiving",
    icon: Heart,
    color: "#5a7a85",
    bgColor: "bg-gradient-to-br from-slate-400/20 to-gray-400/20",
    borderColor: "border-slate-200",
    textColor: "#334155"
  },
  {
    category: "Support",
    title: "Community",
    description: "Connect with other caregivers",
    icon: Users,
    color: "#4a90a4",
    bgColor: "bg-gradient-to-br from-sky-400/20 to-blue-400/20",
    borderColor: "border-sky-200",
    textColor: "#0369a1"
  }
];

export const FloatingModuleGrid = () => {
  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/80 rounded-full px-4 py-2 mb-6 border border-gray-200">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <span className="font-bold text-gray-800">Interactive Modules</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600">
            Guided Care Tools
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Step-by-step modules designed to help you navigate every aspect of caregiving with confidence and grace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {modules.map((module, index) => {
            const IconComponent = module.icon;
            
            return (
              <div
                key={module.title}
                className="group animate-slide-up"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <Card className={`h-full ${module.bgColor} backdrop-blur-md border ${module.borderColor} shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105 relative overflow-hidden`}>
                  {/* Floating geometric shapes */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-10 rounded-full blur-xl" style={{ backgroundColor: module.color }}></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 opacity-10 rounded-full blur-xl" style={{ backgroundColor: module.color }}></div>
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-3 rounded-2xl shadow-lg group-hover:rotate-12 transition-transform duration-500" style={{ backgroundColor: module.color }}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <Badge className="text-white border-white/30" style={{ backgroundColor: module.color }}>
                        {module.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2" style={{ color: module.textColor }}>
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <Button 
                      variant="ghost" 
                      className="w-full group/btn border border-gray-200 hover:border-gray-300 hover:bg-white/50"
                      style={{ color: module.color }}
                    >
                      Start Module
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link to="/modules">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300">
              <Compass className="mr-3 h-6 w-6" />
              Explore All Modules
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
