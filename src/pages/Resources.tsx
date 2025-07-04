import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, BookOpen, Users, MessageCircle, Compass, Shield, Scale, Star, Clock, ArrowRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect, useLayoutEffect } from "react";
import { fetchSectionsByTopicId, subscribeToTableChanges, fetchStoriesBySectionId, fetchResourcesBySectionId, fetchTopics } from "@/lib/supabase/supabaseApi";

const Resources = () => {
  const [topics, setTopics] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Subscribe to changes in the topics table
    const loadAndSetTopics = async () => {
      const data = await fetchTopics(); // assuming this returns topics

      const topicsWithSections = await Promise.all(
        data.map(async (topic) => {
          const sections = await fetchSectionsByTopicId(topic.id);

          const sectionsWithStories = await Promise.all(
            sections.map(async (section) => {
              const resources = await fetchResourcesBySectionId(section.id);

              return {
                ...section,
                resources: resources,
              };
            })
          );

          return {
            ...topic,
            sections: sectionsWithStories,
          };
        })
      );
      setTopics(topicsWithSections);
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
          <h1 className="text-2xl font-bold text-black">Resources by Topics</h1>
        </header>

        <div ref={gridRef} className="space-y-8">
          {topics.map((topic, index) => {
            const randomColor = getConsistentColor(topic.name);
            return (
              <div key={topic.id}>
                <Card className={`
                    bg-white/90 backdrop-blur-md shadow-lg overflow-hidden group cursor-pointer will-change-transform transition-all duration-700 hover:shadow-xl hover:scale-[1.02]
                    ${gridVisible && hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                  `}
                  style={{
                    transitionDelay: gridVisible && hasLoaded ? `${index * 150}ms` : '0ms',
                    position: "relative",
                  }}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: randomColor }}>
                        <Heart className="h-6 w-6 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold mb-2" style={{ color: '#232323' }}>
                          {topic.name}
                        </h3>
                        <p className="text-sm mb-4" style={{ color: '#373618' }}>
                          {topic.description}
                        </p>

                        {/* Mock sections */}
                        <div className="mb-4">
                          <p className="text-xs font-medium text-gray-500 mb-2">Sections:</p>
                          <div className="flex flex-wrap gap-1">
                            {topic.sections.slice(0, 4).map((section, index) => (
                              <Badge
                                key={index}
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
                            {topic.sections.length > 4 && (
                              <Badge
                                variant="secondary"
                                className="text-xs px-2 py-1 font-medium"
                                style={{
                                  backgroundColor: `${randomColor}10`,
                                  color: randomColor,
                                  border: `1px dashed ${randomColor}50`
                                }}
                              >
                                +{topic.sections.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2" style={{ color: '#679aa3' }}>
                            <Heart className="h-4 w-4" />
                            <span className="text-xs">Helpful story</span>
                          </div>
                          <Link to={`/topic/${topic.id}/resources/detail`}
                            state={{
                              topic: topic,
                            }}
                          >
                            <Button variant="ghost" size="sm" className="group/btn" style={{ color: randomColor }}>
                              View Resources
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
      </div>
      <BottomNavigation />
    </div>
  );
};
export default Resources;
