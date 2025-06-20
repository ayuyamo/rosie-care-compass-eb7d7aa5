
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Heart, Sparkles, BookOpen, Compass, MessageCircle, Home, Shield } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";

const stories = [
  {
    category: "Planning",
    title: "New to Caregiving",
    description: "Facing new challenges",
    color: "#d79a8c",
    bgColor: "#d79a8c",
    borderColor: "border-gray-200",
    textColor: "#232323",
    icon: Compass,
    readTime: "5 min"
  },
  {
    category: "Communication",
    title: "Conflicts",
    description: "Resolving caregiving tensions",
    color: "#367588",
    bgColor: "#367588",
    borderColor: "border-gray-200",
    textColor: "#232323",
    icon: MessageCircle,
    readTime: "7 min"
  },
  {
    category: "Planning",
    title: "Housing",
    description: "Navigating housing decisions",
    color: "#49796B",
    bgColor: "#49796B",
    borderColor: "border-gray-200",
    textColor: "#232323",
    icon: Home,
    readTime: "6 min"
  },
  {
    category: "Safety",
    title: "Safety",
    description: "Ensuring caregiving safety",
    color: "#8F9779",
    bgColor: "#8F9779",
    borderColor: "border-gray-200",
    textColor: "#232323",
    icon: Shield,
    readTime: "4 min"
  },
  {
    category: "Wellness",
    title: "Dependence",
    description: "Coping with dependence",
    color: "#5a7a85",
    bgColor: "#5a7a85",
    borderColor: "border-gray-200",
    textColor: "#232323",
    icon: Heart,
    readTime: "5 min"
  }
];

export const CreativeStorySection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <section className="relative z-10 py-6">
      <div className="max-w-md mx-auto px-4">
        <div ref={titleRef} className={`text-center mb-6 transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 bg-white/80 rounded-full px-4 py-2 mb-4 border border-gray-200">
            <Sparkles className="h-5 w-5 text-[#679aa3]" />
            <span className="font-bold text-sm text-[#232323]">Story Collection</span>
          </div>
          <h3 className="text-2xl font-black mb-3 text-[#232323]">
            Real Stories, Real Impact
          </h3>
          <p className="text-sm text-[#373618]">
            Learn from others walking similar paths
          </p>
        </div>

        <div ref={gridRef} className="space-y-4">
          {stories.map((story, index) => {
            const IconComponent = story.icon;
            return (
              <div
                key={story.title}
                className={`group cursor-pointer transition-all duration-700 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                style={{
                  transitionDelay: gridVisible ? `${index * 150}ms` : '0ms'
                }}
              >
                <Card className={`bg-white/90 backdrop-blur-md border ${story.borderColor} shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105`}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: story.color }}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="text-white border-white/30 text-xs" style={{ backgroundColor: story.color }}>
                            {story.category}
                          </Badge>
                          <div className="flex items-center space-x-2 text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span className="text-xs">{story.readTime}</span>
                          </div>
                        </div>

                        <h4 className="text-lg font-bold mb-2" style={{ color: '#232323' }}>
                          {story.title}
                        </h4>
                        <p className="text-sm mb-4" style={{ color: '#373618' }}>
                          {story.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2" style={{ color: '#679aa3' }}>
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">Helpful story</span>
                          </div>
                          <Button variant="ghost" size="sm" className="group/btn text-sm" style={{ color: story.color }}>
                            Read Story
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: '1s' }}>
          <Link to="/stories">
            <Button className="w-full text-white font-bold py-3 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#679aa3' }}>
              <BookOpen className="mr-2 h-5 w-5" />
              Explore All Stories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
