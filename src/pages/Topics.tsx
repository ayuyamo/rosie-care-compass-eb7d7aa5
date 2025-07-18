import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Clock, User, Heart, ArrowRight } from "lucide-react";
import { Link, useParams, useLocation } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect, useLayoutEffect } from "react";
import { fetchChapterById, fetchTopicsByChapterId, fetchStoriesByTopicId, fetchResourcesByTopicId, subscribeToTableChanges } from "@/lib/supabase/supabaseApi";

const Topics = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const location = useLocation();
  const passedChapter = location.state?.chapter;
  const [topics, setTopics] = useState([]);
  const [chapterName, setChapterName] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  // Placeholder images for sections
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

  const setTopicImage = (sectionId: string) => {
    let hash = 0;
    for (let i = 0; i < sectionId.length; i++) {
      hash = sectionId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % placeholderImages.length;
    return placeholderImages[index];
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        if (passedChapter) {
          console.log("Using passed chapter:", passedChapter);
          setChapterName(passedChapter.name);
          // Fetch stories per section
          const topicsWStories = await Promise.all(
            passedChapter.topics.map(async (topic) => {
              const stories = await fetchStoriesByTopicId(topic.id);
              const resources = await fetchResourcesByTopicId(topic.id);
              return {
                ...topic,
                stories: stories,
                resources: resources
              };
            })
          );
          setTopics(topicsWStories);
        } else {
          console.log("Fetching chapter by ID:", chapterId);
          const chapter = await fetchChapterById(chapterId);
          const fetchedTopics = await fetchTopicsByChapterId(chapterId);
          const topicsWStories = await Promise.all(
            fetchedTopics.map(async (topic) => {
              const stories = await fetchStoriesByTopicId(topic.id);
              const resources = await fetchResourcesByTopicId(topic.id);
              return {
                ...topic,
                stories: stories,
                resources: resources
              };
            })
          );
          setChapterName(chapter.name);
          setTopics(topicsWStories);
        }
      } catch (err) {
        console.error("Failed to load topic or sections:", err);
      }
    };

    loadData();
    const unsubscribeTopics = subscribeToTableChanges('topics', async (payload) => {
      const { eventType, new: newTopic, old: oldTopic } = payload;

      setTopics((prevTopics) => {
        if (chapterId === (eventType === 'DELETE' ? oldTopic.chapter_id : newTopic.chapter_id)) {
          if (eventType === 'INSERT') {
            (async () => {
              const stories = await fetchStoriesByTopicId(newTopic.id);
              const resources = await fetchResourcesByTopicId(newTopic.id);
              return [
                ...prevTopics, {
                  ...newTopic,
                  stories: stories,
                  resources: resources
                }]
            })()
          }

          if (eventType === 'UPDATE') {
            return prevTopics.map((topic) =>
              topic.id === newTopic.id ? { ...topic, ...newTopic } : topic
            );
          }

          if (eventType === 'DELETE') {
            return prevTopics.filter((topic) => topic.id !== oldTopic.id);
          }
        }
        return prevTopics;
      });
    });

    const unsubscribeStories = subscribeToTableChanges('stories', async (payload) => {
      const { eventType, new: newStory, old: oldStory } = payload;

      setTopics((prevTopics) => {
        return prevTopics.map((topic) => {
          if (topic.id === (eventType === 'DELETE' ? oldStory.topic_id : newStory.topic_id)) {
            if (eventType === 'INSERT') {
              return {
                ...topic,
                stories: [...topic.stories, newStory]
              };
            }
            if (eventType === 'UPDATE') {
              return {
                ...topic,
                stories: topic.stories.map((story) =>
                  story.id === newStory.id ? { ...story, ...newStory } : story
                )
              };
            }
            if (eventType === 'DELETE') {
              return {
                ...topic,
                stories: topic.stories.filter((story) => story.id !== oldStory.id)
              };
            }
          }
          return topic;
        });
      });
    });
    return () => {
      unsubscribeTopics();
      unsubscribeStories();
    };
  }, []);

  useLayoutEffect(() => {
    if (chapterName.length > 0 && topics.length > 0) {
      requestAnimationFrame(() => {
        setHasLoaded(true);
      });
    }
  }, [topics, chapterName]);

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
          <Link to="/chapters" className="mr-4">
            <Button variant="ghost" size="sm" className="text-[#5a7a85]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-black">Chapter: <span className="italic">{chapterName}</span></h1>
            <h2 className="text-sm text-gray-700">{topics.length} topics</h2>
          </div>
        </header>

        <div ref={gridRef} className="space-y-6">
          {topics.map((topic, index) => {
            const randomColor = getConsistentColor(topic.name);
            const topicImg = topic.image_url || setTopicImage(topic.id);
            return (
              <Card key={topic.id} className={`
                  bg-white/90 backdrop-blur-md shadow-lg overflow-hidden group cursor-pointer transition-all duration-700 hover:shadow-xl hover:scale-[1.02]
                  ${gridVisible && hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                `}
                style={{
                  transitionDelay: gridVisible && hasLoaded ? `${index * 150}ms` : '0ms'
                }}>

                {/* Section Image - Top Half */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={topicImg}
                    alt={topic.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header section with title */}
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#232323' }}>
                      Topic: {topic.name}
                    </h3>
                    <div className="mb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-xs font-medium text-gray-500 mr-2 leading-none pt-[2px]">
                          Stories:
                        </p>
                        {topic.stories.slice(0, 3).map((story, storyIndex) => (
                          <Badge
                            key={storyIndex}
                            variant="secondary"
                            className="text-xs px-2 py-1"
                            style={{
                              backgroundColor: `${randomColor}20`,
                              color: randomColor,
                              border: `1px solid ${randomColor}40`
                            }}
                          >
                            {story.title}
                          </Badge>
                        ))}
                        {topic.stories.length > 3 && (
                          <Badge
                            variant="secondary"
                            className="text-xs px-2 py-1 font-medium"
                            style={{
                              backgroundColor: `${randomColor}10`,
                              color: randomColor,
                              border: `1px dashed ${randomColor}50`
                            }}
                          >
                            +{topic.stories.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>


                    {/* Footer section */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2" style={{ color: '#679aa3' }}>
                        <Heart className="h-4 w-4" />
                        <span className="text-xs">Helpful story</span>
                      </div>
                      <Link to={`/chapters/${chapterId}/topics/${topic.id}/stories`}
                        state={{ topic }}>
                        <Button variant="ghost" size="sm" className="group/btn" style={{ color: randomColor }}>
                          View All {topic.stories.length} Stories
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <BottomNavigation />
    </div >
  );
};

export default Topics;
