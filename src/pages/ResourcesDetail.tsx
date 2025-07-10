
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, BookOpen, Video, FileText, Globe } from "lucide-react";
import { Link, useParams, useLocation } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect, useLayoutEffect } from "react";
import { fetchTopicsByChapterId, fetchStoriesByTopicId, fetchResourcesByTopicId, fetchChapterById } from "@/lib/supabase/supabaseApi";
import { subscribeToTableChanges } from "@/lib/supabase/supabaseApi";
const ResourcesDetail = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const location = useLocation();
  const passedData = location.state?.chapter;
  const [chapterName, setChapterName] = useState("");
  const [topics, setTopics] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadResources = async (topics) => {
      if (!chapterId) return;

      const topicsWStories = await Promise.all(
        topics.map(async (topic) => {
          const resources = await fetchResourcesByTopicId(topic.id);

          return {
            ...topic,
            resources: resources,
          };
        })
      );
      const chapter = await fetchChapterById(chapterId);
      setChapterName(chapter.name);
      setTopics(topicsWStories);
    }
    if (passedData) {
      console.log('Passed data:', passedData);
      setChapterName(passedData.name);
      loadResources(passedData.topics);
    } else {
      if (!chapterId) return;
      (async () => {
        const chapter = await fetchChapterById(chapterId);
        setChapterName(chapter.name);
        const topics = await fetchTopicsByChapterId(chapterId);
        loadResources(topics);
      })()
    }
    const unsubscribeTopics = subscribeToTableChanges('topics', (payload) => {
      const { eventType, new: change, old: oldTopic } = payload;
      setTopics((prevTopics) => {
        if (chapterId === (eventType === 'DELETE' ? oldTopic.chapter_id : change.chapter_id)) {
          if (eventType === 'INSERT') {
            (async () => {
              const resources = await fetchResourcesByTopicId(change.id);
              return [...prevTopics, { change, resources: resources }]
            })()
          }
          if (eventType === 'UPDATE') {
            return prevTopics.map((topic) => topic.id === change.id ? { ...topic, ...change } : topic);
          }
          if (eventType === 'DELETE') {
            return prevTopics.filter(topic => topic.id !== oldTopic.id);
          }
        }
        return prevTopics;
      })
    });
    const unsubscribeResources = subscribeToTableChanges('resources', (payload) => {
      const { eventType, new: change, old: oldResource } = payload;
      setTopics((prevTopics) => {
        return prevTopics.map((topic) => {
          if (topic.id === (eventType === 'DELETE' ? oldResource.topic_id : change.topic_id)) {
            if (eventType === 'INSERT') {
              return { ...topic, resources: [...topic.resources, change] }
            }
            if (eventType === 'UPDATE') {
              return { ...topic, resources: topic.resources.map(resource => resource.id === change.id ? { ...resource, ...change } : resource) }
            }
            if (eventType === 'DELETE') {
              return { ...topic, resources: topic.resources.filter(resource => resource.id !== oldResource.id) }
            }
          }
          return topic;
        })
      })
    })
    return () => {
      unsubscribeTopics(); // Clean up subscription on unmount
      unsubscribeResources();
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
    <div className="min-h-screen bg-[#f8f9fa] p-4 pb-24">
      <div className="max-w-md mx-auto">
        <header ref={headerRef} className={`flex items-center mb-6 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link to="/resources" className="mr-4">
            <Button variant="ghost" size="sm" className="text-[#5a7a85]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-black">Resources by Topics</h1>
            <p className="text-md text-gray-600 italic">Chapter: {chapterName}</p>
          </div>
        </header>

        <div ref={gridRef} className="space-y-6">
          {topics.map((topic, index) => {
            const randomColor = getConsistentColor(topic.name);
            return (
              <Card key={topic.id} className={`
                bg-white/90 backdrop-blur-md shadow-lg overflow-hidden transition-all duration-700 hover:shadow-xl
                ${gridVisible && hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
              `}
                style={{
                  transitionDelay: gridVisible && hasLoaded ? `${index * 150}ms` : '0ms'
                }}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Section Header */}
                    <div className="flex items-start space-x-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                      >
                        <img
                          src={topic.image_url}
                          alt="Section"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold mb-2" style={{ color: '#232323' }}>
                          Topic: {topic.name}
                        </h3>
                      </div>
                    </div>
                    {topic.resources?.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                        </div>
                        <div className="space-y-2 ml-6">
                          {topic.resources.map((resource, resourceIndex) => (
                            <div
                              key={resourceIndex}
                              className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                              <a
                                key={resourceIndex}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors no-underline"
                              >
                                <span className="text-xs text-blue-600 truncate max-w-[80%]">
                                  {new URL(resource.url).hostname}
                                </span>
                                <ExternalLink className="h-4 w-4 text-gray-500 ml-2 flex-shrink-0" />
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default ResourcesDetail;
