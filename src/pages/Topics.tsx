import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Clock, User, Heart, ArrowRight } from "lucide-react";
import { Link, useParams, useLocation } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useState, useEffect, useLayoutEffect } from "react";
import { fetchChapterById, fetchTopicsByChapterId, fetchStoriesByTopicId, fetchResourcesByTopicId, subscribeToTableChanges } from "@/lib/supabase/supabaseApi";
import { getConsistentColor } from "@/lib/colors";
import Submit from "@/components/Submit";
import { TopicsSkeleton } from "@/components/ui/skeletons";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Topics = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const location = useLocation();
  const passedChapter = location.state?.chapter;
  const [topics, setTopics] = useState([]);
  const [chapterName, setChapterName] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

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
    if (topics.length > 0) {
      setHasLoaded(true);
    }
  }, [topics]);

  console.log('topics length: ', topics.length);

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(window.innerHeight, hasLoaded);
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(window.innerHeight, hasLoaded);

  if (!hasLoaded) {
    return <TopicsSkeleton />;
  }


  return (
    <div>

      <header ref={headerRef} className={`flex flex-wrap items-center pt-4 mb-6 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <Link to="/chapters" className="flex flex-row">
          <Button variant="ghost" size="sm" className="text-[#5a7a85] mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-black">Chapter: <span className="italic">{chapterName}</span></h1>
            <h2 className="text-base text-gray-700">{topics.length} topics</h2>
          </div>
        </Link>
      </header>

      <div ref={gridRef} className="space-y-6 mb-6">
        {topics.map((topic, index) => {
          const randomColor = getConsistentColor(topic.name);
          return (
            <Card key={topic.id} className={`
                  bg-white/90 backdrop-blur-md shadow-lg overflow-hidden group cursor-pointer transition-all duration-700 hover:shadow-xl hover:scale-[1.02]
                  ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                `}
              style={{
                transitionDelay: gridVisible ? `${index * 150}ms` : '0ms'
              }}>

              {/* Section Image - Top Half */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={topic.image_url}
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
                      <p className="text-base font-medium text-gray-500 mr-2 leading-none pt-[2px]">
                        Stories:
                      </p>
                      {topic.stories.slice(0, 3).map((story, storyIndex) => (
                        <Badge
                          key={storyIndex}
                          variant="secondary"
                          className="text-base text-center px-2 py-1"
                          style={{
                            backgroundColor: `${randomColor}10`,
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
                          className="text-base text-center px-2 py-1 font-medium"
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
                  <Link className="flex items-center justify-end pt-2"
                    to={`/chapters/${chapterId}/topics/${topic.id}/stories`}
                    state={{ topic }}>
                    <p className="text-base" style={{ color: randomColor }}>
                      View All {topic.stories.length} Stories
                    </p>
                    <Button variant="ghost" size="sm" className="text-[#5a7a85]">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Submit />
      <BottomNavigation />
    </div >
  );
};

export default Topics;
