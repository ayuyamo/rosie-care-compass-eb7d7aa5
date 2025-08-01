import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect, useLayoutEffect } from "react";
import { fetchTopicsByChapterId, subscribeToTableChanges, fetchChapters } from "@/lib/supabase/supabaseApi";
import { getConsistentColor } from "@/lib/colors";
import Submit from "@/components/Submit";
import { ResourcesSkeleton } from "@/components/ui/skeletons";

const Resources = () => {
  const [chapters, setChapters] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Subscribe to changes in the topics table
    const loadChapters = async () => {
      const chapters = await fetchChapters(); // assuming this returns topics

      const chaptersWResources = await Promise.all(
        chapters.map(async (chapter) => {
          const topics = await fetchTopicsByChapterId(chapter.id);

          return {
            ...chapter,
            topics: topics,
          };
        })
      );
      setChapters(chaptersWResources);
    };

    loadChapters();
    const unsubscribeChapters = subscribeToTableChanges('chapters', (payload) => {
      const { eventType, new: change, old: oldChapter } = payload;
      setChapters((prevChapters) => {
        if (eventType === 'INSERT') {
          (async () => {
            const topics = await fetchTopicsByChapterId(change.id);
            return [...prevChapters, { newRow: change, topics: topics }]
          })()
        }
        if (eventType === 'UPDATE') {
          return prevChapters.map((chapter) => {
            return chapter.id === change.id ? { ...chapter, ...change } : chapter;
          });
        }
        if (eventType === 'DELETE') {
          return prevChapters.filter(chapter => chapter.id !== oldChapter.id);
        }
      })
    });
    const unsubscribeTopics = subscribeToTableChanges('topics', (payload) => {
      const { eventType, new: change, old: oldTopic } = payload;
      setChapters((prevChapters) => {
        return prevChapters.map((prevChapter) => {
          if (prevChapter.id === (eventType === 'DELETE' ? oldTopic.chapter_id : change.chapter_id)) {
            console.log('found chapter to insert/delete/update: ', prevChapter.name);
            if (eventType === 'INSERT') {
              return { ...prevChapter, topics: [...prevChapter.topics, change] }
            }
            if (eventType === 'UPDATE') {
              return { ...prevChapter, topics: prevChapter.topics.map(topic => topic.id === change.id ? { ...topic, ...change } : topic) }
            }
            if (eventType === 'DELETE') {
              return { ...prevChapter, topics: prevChapter.topics.filter(topic => topic.id !== oldTopic.id) }
            }
          }
          return prevChapter;
        })
      })

    })
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

  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(window.innerHeight, hasLoaded);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(window.innerHeight, hasLoaded);

  if (!hasLoaded) {
    return <ResourcesSkeleton />;
  }

  return (
    <div className="min-h-screen pb-14">

      <header ref={headerRef} className={`flex flex-wrap items-center mb-6 pt-4 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <Link to="/" className="flex flex-row">
          <Button variant="ghost" size="sm" className="text-[#5a7a85] mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-black">Resources</h1>
            <h2 className="text-base italic text-gray-700">Helpful resources shared in each chapter</h2>
          </div>
        </Link>
      </header>

      <div ref={gridRef} className="space-y-8">
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
                            className="text-base px-2 py-1"
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
                            className="text-base px-2 py-1 font-medium"
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


                    <Link className='flex items-center justify-end'
                      to={`/chapters/${chapter.id}/resources/detail`}
                      state={{ chapter }}
                    >
                      <p className='text-base' style={{ color: randomColor }}>View Resources</p>
                      <Button variant="ghost" size="sm" className="group/btn text-base" style={{ color: randomColor }}>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
        <Submit />
      </div>
      <BottomNavigation />
    </div>
  );
};
export default Resources;
