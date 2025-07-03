import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Sparkles, BookOpen } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { useState, useEffect, useLayoutEffect } from "react";
import { subscribeToTableChanges } from "@/lib/supabase/supabaseApi";
import { fetchTopics } from "@/lib/supabase/supabaseApi";

const colors = [
  "#d79a8c", "#367588", "#49796B", "#8F9779", "#5a7a85",
  "#B8860B", "#8B4513", "#556B2F", "#800080", "#008080",
  "#CD853F", "#4682B4", "#2E8B57", "#9932CC", "#20B2AA"
];

// Mock images for story cards
const mockImages = [
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop"
];

/**
 * Hash a string to a consistent index for color mapping.
 * @param key Any string like a name or ID
 * @returns A hex color string
 */
const getConsistentColor = (key: string): string => {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash); // simple string hash
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export const CreativeStorySection = () => {
  const [stories, setStories] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchTopics();
      const limitedStories = data.slice(0, 3);
      setStories(limitedStories);
    };
    fetch();
    // Subscribe to changes in the topics table
    const unsubscribe = subscribeToTableChanges('topics', (newData) => {
      console.log('🔄 Change received:', newData);
      fetch(); // refetch stories on change
    });
    return () => {
      unsubscribe(); // Clean up subscription on unmount
    };
  }, []);

  useLayoutEffect(() => {
    if (stories.length > 0) {
      requestAnimationFrame(() => {
        setHasLoaded(true);
      });
    }
  }, [stories]);
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
            const randomColor = getConsistentColor(story.name);
            const mockImage = story.image_url || mockImages[index % mockImages.length];
            return (
              <div
                key={story.name}
                className={`group cursor-pointer transition-all duration-700 ${gridVisible && hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                style={{
                  transitionDelay: gridVisible && hasLoaded ? `${index * 150}ms` : '0ms'
                }}
              >
                <Card className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden">
                        <img
                          src={mockImage}
                          alt={story.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-bold mb-2" style={{ color: '#232323' }}>
                          {story.name}
                        </h4>
                        <p className="text-sm mb-4" style={{ color: '#373618' }}>
                          {story.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2" style={{ color: '#679aa3' }}>
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">Helpful story</span>
                          </div>
                          <Link to={`/topic/${story.id}/sections`}>
                            <Button variant="ghost" size="sm" className="group/btn text-sm" style={{ color: randomColor }}>
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </Button>
                          </Link>

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
          <Link to="/topics">
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
