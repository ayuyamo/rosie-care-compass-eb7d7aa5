import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Heart, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fetchTopicsByChapterId, subscribeToTableChanges, fetchChapters } from "@/lib/supabase/supabaseApi";
import { useState, useEffect, useLayoutEffect } from "react";

const Chapters = () => {
  const [chapters, setChapters] = useState([]);
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
    const loadAndSetChapters = async () => {
      const data = await fetchChapters();
      // Add mock sections to each story
      const chaptersWTopics = await Promise.all(
        data.map(async (chapter) => {
          const topics = await fetchTopicsByChapterId(chapter.id);
          return {
            ...chapter,
            topics: topics,
          }
        })
      );
      setChapters(chaptersWTopics);
    };
    loadAndSetChapters();
    const unsubscribeChapters = subscribeToTableChanges('chapters', (newData) => {
      const { eventType, new: change, old: oldChapter } = newData;
      setChapters((prevChapters) => {
        if (eventType === 'INSERT') {
          (async () => {
            const topics = await fetchTopicsByChapterId(change.id);
            return [...prevChapters, { ...change, topics }];
          })();
        }
        if (eventType === 'UPDATE') {
          return prevChapters.map((prevChapter) => {
            return prevChapter.id === change.id ? { ...prevChapter, ...change } : prevChapter;
          })
        }
        if (eventType === 'DELETE') {
          return prevChapters.filter((prevChapter) => prevChapter.id !== oldChapter.id);
        }
      });
    });

    const unsubscribeTopics = subscribeToTableChanges('topics', (newData) => {
      const { eventType, new: change, old: oldTopic } = newData;
      setChapters((prevChapters) => {
        return prevChapters.map((chapter) => {
          if (chapter.id === (eventType === 'DELETE' ? oldTopic.chapter_id : change.chapter_id)) {
            if (eventType === 'INSERT') {
              return {
                ...chapter,
                topics: [...chapter.topics, change]
              };
            }
            if (eventType === 'UPDATE') {
              return {
                ...chapter,
                topics: chapter.topics.map((topic) =>
                  topic.id === change.id ? { ...topic, ...change } : topic
                )
              };
            }
            if (eventType === 'DELETE') {
              return {
                ...chapter,
                topics: chapter.topics.filter((topic) => topic.id !== oldTopic.id)
              };
            }
          }
          return chapter;
        });
      });
    });
    return () => {
      unsubscribeChapters(); // Clean up subscription on unmount
      unsubscribeTopics();
    };
  }, []);

  useLayoutEffect(() => {
    if (chapters.length > 0) {
      requestAnimationFrame(() => {
        setHasLoaded(true);
      });
    }
  }, [chapters]);

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
    <div className="min-h-screen bg-[#f8f9fa] p-4 pb-40">
      <div className="max-w-md mx-auto">
        <header ref={headerRef} className={`flex items-center mb-6 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="sm" className="text-[#5a7a85]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-black">
            Chapters of Care
          </h1>
        </header>

        <div ref={gridRef} className="space-y-8">
          {chapters.map((chapter, index) => {
            const randomColor = getConsistentColor(chapter.name);
            return (
              <div key={chapter.id}>
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
                      src={chapter.image_url}
                      alt={chapter.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold mb-2" style={{ color: '#232323' }}>
                          {chapter.name}
                        </h3>
                        <p className="text-sm mb-4" style={{ color: '#373618' }}>
                          {chapter.description}
                        </p>
                      </div>
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1 items-start">
                          <p className="text-xs font-medium text-gray-500 mr-2 pt-[3px]">Topics:</p>
                          {chapter.topics.slice(0, 3).map((topic, topicIndex) => (
                            <Badge
                              key={topicIndex}
                              variant="secondary"
                              className="text-xs px-2 py-1"
                              style={{
                                backgroundColor: `${randomColor}20`,
                                color: randomColor,
                                border: `1px solid ${randomColor}40`
                              }}
                            >
                              {topic.name}
                            </Badge>
                          ))}
                          {chapter.topics.length > 3 && (
                            <Badge
                              variant="secondary"
                              className="text-xs px-2 py-1 font-medium"
                              style={{
                                backgroundColor: `${randomColor}10`,
                                color: randomColor,
                                border: `1px dashed ${randomColor}50`
                              }}
                            >
                              +{chapter.topics.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>


                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2" style={{ color: '#679aa3' }}>
                          <Heart className="h-4 w-4" />
                          <span className="text-xs">Helpful story</span>
                        </div>
                        <Link to={`/chapters/${chapter.id}/topics`}
                          state={{ chapter }}
                        >
                          <Button variant="ghost" size="sm" className="group/btn" style={{ color: randomColor }}>
                            View All {chapter.topics.length} Topics
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

export default Chapters;
