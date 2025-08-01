
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, BookOpen, Heart } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { useState, useEffect, useLayoutEffect } from "react";
import { subscribeToTableChanges } from "@/lib/supabase/supabaseApi";
import { fetchChapters, fetchTopicsByChapterId } from "@/lib/supabase/supabaseApi";
import { getConsistentColor } from "@/lib/colors";
import { CreativeStorySkeleton } from "@/components/ui/skeletons";


export const CreativeStorySection = () => {
  const [chapters, setChapters] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const chapters = await fetchChapters();
      const chaptersWithTopics = await Promise.all(
        chapters.map(async (chapter) => {
          const topics = await fetchTopicsByChapterId(chapter.id);
          return {
            ...chapter,
            topics: topics,
          }
        })
      );
      setChapters(chaptersWithTopics);
    };
    fetch();
    // Subscribe to changes in the topics table
    const unsubscribeChapters = subscribeToTableChanges('chapters', (newData) => {
      const { eventType, new: change } = newData;
      setChapters((prevChapters) => {
        if (eventType == 'INSERT') {
          (async () => {
            const topics = await fetchTopicsByChapterId(change.id);
            return [...prevChapters, { ...change, topics }];
          })();
        }
        if (eventType == 'UPDATE') {
          return prevChapters.map((prevChapter) => {
            return prevChapter.id == change.id ? { ...prevChapter, ...change } : prevChapter;
          });
        }
        if (eventType == 'DELETE') {
          return prevChapters.filter((prevChapter) => prevChapter.id !== change.id);
        }
      });
    });
    // subscribe to changes in the sections table
    const unsubscribeTopics = subscribeToTableChanges('topics', (newData) => {
      const { eventType, new: newTopic, old: oldTopic } = newData;
      setChapters((prevChapters) => {
        return prevChapters.map((prevChapter) => {
          if (prevChapter.id === (eventType === 'DELETE' ? oldTopic.chapter_id : newTopic.chapter_id)) {
            if (eventType === 'INSERT') {
              return { ...prevChapter, topics: [...prevChapter.topics, newTopic] }
            }
            if (eventType === 'UPDATE') {
              return { ...prevChapter, topics: prevChapter.topics.map(topic => topic.id === newTopic.id ? { ...topic, ...newTopic } : topic) }
            }
            if (eventType === 'DELETE') {
              return { ...prevChapter, topics: prevChapter.topics.filter(topic => topic.id !== oldTopic.id) }
            }
          }
          return prevChapter;
        })
      });
    });
    return () => {
      unsubscribeChapters(); // Clean up subscription on unmount
      unsubscribeTopics(); // Clean up section subscription on unmount
    };
  }, []);

  useLayoutEffect(() => {
    if (chapters.length > 0) {
      setHasLoaded(true);
    }
  }, [chapters]);
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(window.innerHeight, hasLoaded);
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(window.innerHeight, hasLoaded);

  if (!hasLoaded || chapters.length === 0) {
    return <CreativeStorySkeleton />;
  }

  return (
    <section className="relative z-10 py-6">

      <div ref={titleRef} className={`text-center mb-6 transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h3 className="text-2xl font-black mb-3 text-[#232323]">
          Real Stories, Real Impact
        </h3>
        <p className="text-base text-[#373618]">
          Learn from others walking similar paths
        </p>
      </div>

      <div ref={gridRef} className="space-y-8">
        {chapters.slice(0, 3).map((chapter, index) => {
          const randomColor = getConsistentColor(chapter.name);
          return (
            <Link
              key={chapter.name}
              to={`/chapters/${chapter.id}/topics`}
              className={`block group cursor-pointer transition-all duration-700 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
              style={{
                transitionDelay: gridVisible ? `${index * 150}ms` : '0ms'
              }}
              state={{ chapter }}
            >
              <Card className={`
                    bg-white/90 backdrop-blur-md shadow-lg overflow-hidden group cursor-pointer will-change-transform transition-all duration-700 hover:shadow-xl hover:scale-[1.02]
                    ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                  `}
                style={{
                  transitionDelay: gridVisible ? `${index * 150}ms` : '0ms',
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
                  <div className="gap-y-4">
                    <div>
                      <h3 className="text-base font-bold mb-2" style={{ color: '#232323' }}>
                        {chapter.name}
                      </h3>
                      <p className="text-base mb-4" style={{ color: '#373618' }}>
                        {chapter.description}
                      </p>
                    </div>
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1 items-start">
                        <p className="text-base font-medium text-gray-500 mr-2">Topics:</p>
                        {chapter.topics.slice(0, 3).map((topic, topicIndex) => (
                          <Badge
                            key={topicIndex}
                            variant="secondary"
                            className="text-base px-2 py-1 text-center"
                            style={{
                              backgroundColor: `${randomColor}10`,
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
                            className="text-base px-2 py-1 font-medium text-center"
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

                    <div className="flex items-center justify-end">
                      <p className="text-base" style={{ color: randomColor }}>
                        View All {chapter.topics.length} Topics
                      </p>
                      <Button variant="ghost" size="sm" className="text-[#5a7a85]">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>

                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="text-center mt-6 text-lg animate-fade-in" style={{ animationDelay: '1s' }}>
        <Link to="/chapters">
          <button
            className="w-full inline-flex items-center rounded-md justify-center min-w-[140px] md:min-w-[170px] h-12 px-4 shadow-lg border-2 border-[#754848] text-[#754848] font-semibold text-base leading-6 tracking-tight bg-white hover:text-[#06f] hover:border-[#06f] focus:text-[#171e29] transition-all duration-300"
          >
            Explore More Topics
          </button>
        </Link>
      </div>
    </section>
  );
};
