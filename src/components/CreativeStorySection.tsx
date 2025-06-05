
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Heart, Star, Sparkles, BookOpen } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const stories = [
  {
    category: "New Beginnings",
    title: "Reluctantly",
    description: "When caregiving finds you unprepared",
    color: "#c4a91a",
    emoji: "🌱",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop",
    readTime: "5 min"
  },
  {
    category: "Tensions",
    title: "Money Matters",
    description: "Navigating financial conversations",
    color: "#5a7a85",
    emoji: "💰",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop",
    readTime: "7 min"
  },
  {
    category: "Housing",
    title: "Distance & Care",
    description: "Love knows no geographical boundaries",
    color: "#4a90a4",
    emoji: "🏠",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop",
    readTime: "6 min"
  },
  {
    category: "Safety",
    title: "Hazard Falls",
    description: "Creating safe spaces for loved ones",
    color: "#7a8a60",
    emoji: "🛡️",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=300&h=200&fit=crop",
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
          <div className="inline-flex items-center space-x-2 bg-[#5a7a85]/20 rounded-full px-4 py-2 mb-4">
            <Sparkles className="h-5 w-5 text-[#c4a91a]" />
            <span className="text-[#c4a91a] font-bold text-sm">Story Collection</span>
          </div>
          <h3 className="text-2xl font-black text-[#c4a91a] mb-3">
            Real Stories, Real Impact
          </h3>
          <p className="text-[#5a7a85] text-sm">
            Learn from others walking similar paths
          </p>
        </div>

        <div ref={gridRef} className="space-y-4">
          {stories.map((story, index) => (
            <div
              key={story.title}
              className={`group cursor-pointer transition-all duration-700 ${
                gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{
                transitionDelay: gridVisible ? `${index * 150}ms` : '0ms'
              }}
            >
              <Card className="bg-white/60 backdrop-blur-md border border-[#c4a91a]/30 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105 overflow-hidden">
                <div className="relative">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  <div className="absolute top-3 left-3">
                    <Badge className="text-white border-white/30 text-xs" style={{ backgroundColor: story.color }}>
                      {story.category}
                    </Badge>
                  </div>
                  
                  <div className="absolute top-3 right-3 flex items-center space-x-2 text-white/80">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">{story.readTime}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">{story.emoji}</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-[#c4a91a] fill-current" />
                        ))}
                      </div>
                    </div>
                    <h4 className="text-xl text-[#c4a91a] font-bold mb-1 group-hover:text-white transition-colors">
                      {story.title}
                    </h4>
                    <p className="text-[#5a7a85] text-sm mb-3">
                      {story.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-[#5a7a85]">
                        <Heart className="h-4 w-4" />
                        <span className="text-xs">Helpful for many</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[#c4a91a] hover:bg-white/20 group/btn">
                        Read Story
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: '1s' }}>
          <Button className="w-full bg-[#4a90a4] hover:bg-[#4a90a4]/80 text-white font-bold py-3 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
            <BookOpen className="mr-2 h-5 w-5" />
            Explore All Stories
          </Button>
        </div>
      </div>
    </section>
  );
};
