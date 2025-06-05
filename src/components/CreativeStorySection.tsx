
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
    gradient: "from-emerald-400/20 to-teal-500/20",
    borderGradient: "from-emerald-400 to-teal-500",
    emoji: "🌱"
  },
  {
    category: "Tensions",
    title: "Money Matters",
    description: "Navigating financial conversations",
    gradient: "from-amber-400/20 to-orange-500/20",
    borderGradient: "from-amber-400 to-orange-500",
    emoji: "💰"
  },
  {
    category: "Housing",
    title: "Distance & Care",
    description: "Love knows no geographical boundaries",
    gradient: "from-blue-400/20 to-cyan-500/20",
    borderGradient: "from-blue-400 to-cyan-500",
    emoji: "🏠"
  },
  {
    category: "Safety",
    title: "Hazard Falls",
    description: "Creating safe spaces for loved ones",
    gradient: "from-red-400/20 to-rose-500/20",
    borderGradient: "from-red-400 to-rose-500",
    emoji: "🛡️"
  },
  {
    category: "Change",
    title: "Role Reversal",
    description: "When you become the caregiver",
    gradient: "from-purple-400/20 to-pink-500/20",
    borderGradient: "from-purple-400 to-pink-500",
    emoji: "🔄"
  },
  {
    category: "Legal",
    title: "Power & Responsibility",
    description: "Understanding legal pathways",
    gradient: "from-indigo-400/20 to-purple-500/20",
    borderGradient: "from-indigo-400 to-purple-500",
    emoji: "⚖️"
  }
];

export const CreativeStorySection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className={`text-center mb-16 transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-3 bg-green-400/20 rounded-full px-6 py-3 mb-8 animate-glow">
            <Sparkles className="h-6 w-6 text-green-300" />
            <span className="text-green-200 font-bold text-lg">Story Galaxy</span>
          </div>
          <h3 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 mb-6">
            Real Stories, Real Impact
          </h3>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Each story is a constellation of experience, illuminating the path for others 
            walking similar journeys through the cosmos of caregiving.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <Card className={`h-full bg-gradient-to-br ${story.gradient} backdrop-blur-md border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 relative overflow-hidden animate-float`}
                style={{ animationDelay: `${index * 0.5}s` }}>
                {/* Enhanced Gradient Border with glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${story.borderGradient} p-0.5 rounded-lg group-hover:animate-glow`}>
                  <div className="bg-black/20 backdrop-blur-md h-full w-full rounded-lg"></div>
                </div>
                
                <div className="relative z-10 p-6 h-full flex flex-col">
                  <CardHeader className="pb-4 px-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{story.emoji}</span>
                        <Badge className="bg-white/20 text-white border-white/30 text-xs">
                          {story.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-white/60">
                        <Clock className="h-4 w-4" />
                        <span className="text-xs">5 min</span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl text-white group-hover:text-yellow-200 transition-colors">
                      {story.title}
                    </CardTitle>
                    <CardDescription className="text-white/80 text-lg">
                      {story.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="px-0 pt-0 mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-white/60">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">Helpful for many</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 group/btn">
                        Read Story
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Enhanced Floating Action */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '1s' }}>
          <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 animate-glow">
            <BookOpen className="mr-3 h-6 w-6" />
            Explore All Stories
          </Button>
        </div>
      </div>
    </section>
  );
};
