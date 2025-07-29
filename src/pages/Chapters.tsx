import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Heart, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fetchTopicsByChapterId, subscribeToTableChanges, fetchChapters } from "@/lib/supabase/supabaseApi";
import { useState, useEffect, useLayoutEffect } from "react";
import { getConsistentColor } from "@/lib/colors";
import Submit from "@/components/Submit";
import { ChaptersSkeleton } from "@/components/ui/skeletons";

const Chapters = () => {
  const [chapters, setChapters] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

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
      setHasLoaded(true);
    }
  }, [chapters]);

  console.log('current screen height: ', window.innerHeight);

  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(window.innerHeight, hasLoaded);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(window.innerHeight, hasLoaded);

  if (!hasLoaded) {
    return <ChaptersSkeleton />;
  }

  return (
    <div className="min-h-screen">

      <header ref={headerRef} className={`flex flex-wrap items-center gap-x-4 pt-4 mb-6 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <Link to="/" className="flex flex-row">
          <Button variant="ghost" size="sm" className="text-[#5a7a85] mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-black">
            Chapters of Caregiving
          </h1>
        </Link>
      </header>

      <div ref={gridRef} className="space-y-8 mb-8">
        {chapters.map((chapter, index) => {
          const randomColor = getConsistentColor(chapter.name);
          return (
            <div key={chapter.id}>
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
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: '#232323' }}>
                        {chapter.name}
                      </h3>
                      <p className="text-base mb-4" style={{ color: '#373618' }}>
                        {chapter.description}
                      </p>
                    </div>
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1 items-start">
                        <p className="text-base font-medium text-gray-500 mr-2 pt-[3px]">Topics:</p>
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


                    <Link className="flex items-center justify-end"
                      to={`/chapters/${chapter.id}/topics`}
                      state={{ chapter }}
                    >
                      <p className="text-base" style={{ color: randomColor }}>
                        View All {chapter.topics.length} {chapter.topics.length > 1 ? 'Topics' : 'Topic'}
                      </p>
                      <Button variant="ghost" size="sm" style={{ color: randomColor }}>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
      <Submit />
      <BottomNavigation />
    </div>
  );
};

export default Chapters;
