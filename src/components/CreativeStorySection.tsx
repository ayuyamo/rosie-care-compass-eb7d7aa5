import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Heart, Sparkles, BookOpen } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const stories = [
  {
    category: "New Beginnings",
    title: "Reluctantly",
    description: "When caregiving finds you unprepared",
    color: "#dab216",
    bgColor: "#dab216",
    borderColor: "border-gray-200",
    textColor: "#232323",
    emoji: "🌱",
    readTime: "5 min"
  },
  {
    category: "Tensions",
    title: "Money Matters",
    description: "Navigating financial conversations",
    color: "#2b6cb0",
    bgColor: "#2b6cb0",
    borderColor: "border-gray-200",
    textColor: "#232323",
    emoji: "💰",
    readTime: "7 min"
  },
  {
    category: "Housing",
    title: "Distance & Care",
    description: "Love knows no geographical boundaries",
    color: "#373618",
    bgColor: "#373618",
    borderColor: "border-gray-200",
    textColor: "#232323",
    emoji: "🏠",
    readTime: "6 min"
  },
  {
    category: "Safety",
    title: "Hazard Falls",
    description: "Creating safe spaces for loved ones",
    color: "#679aa3",
    bgColor: "#679aa3",
    borderColor: "border-gray-200",
    textColor: "#232323",
    emoji: "🛡️",
    readTime: "4 min"
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
          {stories.map((story, index) => (
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
                      <span className="text-2xl">{story.emoji}</span>
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
                          <span className="text-xs">Helpful story</span>
                        </div>
                        <Button variant="ghost" size="sm" className="group/btn" style={{ color: story.color }}>
                          Read Story
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
          <Button className="w-full text-white font-bold py-3 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#dab216' }}>
            <BookOpen className="mr-2 h-5 w-5" />
            Explore All Stories
          </Button>
        </div>
      </div>
    </section>
  );
};
