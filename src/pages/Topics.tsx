import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Heart, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fetchSectionsByTopicId, subscribeToTableChanges, fetchTopics } from "@/lib/supabase/supabaseApi";
import { useState, useEffect, useLayoutEffect } from "react";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Placeholder images for topics
  const placeholderImages = [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=200&fit=crop"
  ];

  const getTopicImage = (topicId: string) => {
    let hash = 0;
    for (let i = 0; i < topicId.length; i++) {
      hash = topicId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % placeholderImages.length;
    return placeholderImages[index];
  };

  useEffect(() => {
    // Subscribe to changes in the topics table
    const loadAndSetTopics = async () => {
      const data = await fetchTopics();
      // Add mock sections to each story
      const storiesWithSections = await Promise.all(
        data.map(async (story) => {
          const sections = await fetchSectionsByTopicId(story.id);
          return {
            ...story,
            sections: sections,
          }
        })
      );
      setTopics(storiesWithSections);
    };
    loadAndSetTopics();
    const unsubscribe = subscribeToTableChanges('topics', (newData) => {
      console.log('🔄 Change received:', newData);
      loadAndSetTopics();
    });
    return () => {
      unsubscribe(); // Clean up subscription on unmount
    };
  }, []);

  useLayoutEffect(() => {
    if (topics.length > 0) {
      requestAnimationFrame(() => {
        setHasLoaded(true);
      });
    }
  }, [topics]);

  const colors = [
    "#d79a8c", "#367588", "#49796B", "#8F9779", "#5a7a85",
    "#B8860B", "#8B4513", "#556B2F", "#800080", "#008080",
    "#CD853F", "#4682B4", "#2E8B57", "#9932CC", "#20B2AA"
  ];

  const getConsistentColor = (key: string): string => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = key.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 pb-24">
      <div className="max-w-md mx-auto">
        <header ref={headerRef} className={`flex items-center mb-6 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="sm" className="text-[#5a7a85]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-black">Stories</h1>
        </header>

        <div ref={gridRef} className="space-y-8">
          {topics.map((story, index) => {
            const randomColor = getConsistentColor(story.name);
            const topicImage = story.image_url;
            return (
              <div key={story.id}>
                <Card className={`
                    bg-white/90 backdrop-blur-md shadow-lg overflow-hidden group cursor-pointer will-change-transform transition-all duration-700 hover:shadow-xl hover:scale-[1.02]
                    ${gridVisible && hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                  `}
                  style={{
                    transitionDelay: gridVisible && hasLoaded ? `${index * 150}ms` : '0ms',
                    position: "relative",
                  }}>

                  {/* Topic Image - Top Half */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={topicImage}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold mb-2" style={{ color: '#232323' }}>
                          {story.name}
                        </h3>
                        <p className="text-sm mb-4" style={{ color: '#373618' }}>
                          {story.description}
                        </p>
                      </div>

                      {/* Mock sections */}
                      <div className="mb-4">
                        <p className="text-xs font-medium text-gray-500 mb-2">Sections:</p>
                        <div className="flex flex-wrap gap-1">
                          {story.sections.slice(0, 4).map((section, sectionIndex) => (
                            <Badge
                              key={sectionIndex}
                              variant="secondary"
                              className="text-xs px-2 py-1"
                              style={{
                                backgroundColor: `${randomColor}20`,
                                color: randomColor,
                                border: `1px solid ${randomColor}40`
                              }}
                            >
                              {section.name}
                            </Badge>
                          ))}
                          {story.sections.length > 4 && (
                            <Badge
                              variant="secondary"
                              className="text-xs px-2 py-1 font-medium"
                              style={{
                                backgroundColor: `${randomColor}10`,
                                color: randomColor,
                                border: `1px dashed ${randomColor}50`
                              }}
                            >
                              +{story.sections.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2" style={{ color: '#679aa3' }}>
                          <Heart className="h-4 w-4" />
                          <span className="text-xs">Helpful story</span>
                        </div>
                        <Link to={`/topic/${story.id}/sections`}
                          state={{ topic: story }}
                        >
                          <Button variant="ghost" size="sm" className="group/btn" style={{ color: randomColor }}>
                            View Sections
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Topics;
