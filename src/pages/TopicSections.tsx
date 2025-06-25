
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fetchSectionsByTopicId, fetchTopicById } from "@/lib/supabase/supabaseApi";
import { useState, useEffect } from "react";

const TopicSections = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [sections, setSections] = useState([]);
  const [topic, setTopic] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!topicId) return;
      
      try {
        const [topicData, sectionsData] = await Promise.all([
          fetchTopicById(topicId),
          fetchSectionsByTopicId(topicId)
        ]);
        
        setTopic(topicData);
        setSections(sectionsData);
        requestAnimationFrame(() => setHasLoaded(true));
      } catch (error) {
        console.error('Error fetching topic data:', error);
      }
    };
    
    fetchData();
  }, [topicId]);

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

  if (!topic) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] p-4 pb-24">
        <div className="max-w-md mx-auto">
          <div className="text-center mt-20">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 pb-24">
      <div className="max-w-md mx-auto">
        <header ref={headerRef} className={`flex items-center mb-6 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link to="/stories" className="mr-4">
            <Button variant="ghost" size="sm" className="text-[#5a7a85]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-black">{topic.name}</h1>
            <p className="text-sm text-gray-600">{topic.description}</p>
          </div>
        </header>

        <div ref={gridRef} className="space-y-4">
          {sections.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              No sections available for this topic.
            </div>
          ) : (
            sections.map((section, index) => {
              const randomColor = getConsistentColor(section.title || section.name);
              return (
                <Card key={section.id} className={`
                    bg-white/90 backdrop-blur-md shadow-lg overflow-hidden group cursor-pointer transition-all duration-700
                    ${gridVisible && hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                  `}
                  style={{
                    transitionDelay: gridVisible && hasLoaded ? `${index * 150}ms` : '0ms'
                  }}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: randomColor }}>
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold mb-2" style={{ color: '#232323' }}>
                          {section.title || section.name}
                        </h3>
                        <p className="text-sm mb-4" style={{ color: '#373618' }}>
                          {section.description || 'No description available.'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default TopicSections;
