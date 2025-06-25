
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Heart, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { loadStories } from "@/lib/supabase/supabaseApi";
import { useState, useEffect } from "react";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Mock sections data
  const mockSections = [
    "Getting Started", "Understanding Basics", "Advanced Techniques", "Real-world Examples", 
    "Best Practices", "Common Challenges", "Expert Tips", "Case Studies",
    "Practical Applications", "Next Steps", "Resources", "Community Insights"
  ];

  const getRandomSections = () => {
    const shuffled = [...mockSections].sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * 4) + 2; // 2-5 sections
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await loadStories();
      // Add mock sections to each story
      const storiesWithSections = data.map(story => ({
        ...story,
        sections: getRandomSections()
      }));
      setStories(storiesWithSections);
      requestAnimationFrame(() => setHasLoaded(true));
    };
    fetch();
  }, []);

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

        <div ref={gridRef} className="space-y-6">
          {stories.map((story, index) => {
            const randomColor = getConsistentColor(story.name);
            return (
              <Link key={story.id} to={`/topic/${story.id}/sections`}>
                <Card className={`
                    bg-white/90 backdrop-blur-md shadow-lg overflow-hidden group cursor-pointer transition-all duration-700 hover:shadow-xl hover:scale-[1.02]
                    ${gridVisible && hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                  `}
                  style={{
                    transitionDelay: gridVisible && hasLoaded ? `${index * 150}ms` : '0ms'
                  }}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: randomColor }}>
                        <Heart className="h-6 w-6 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold mb-2" style={{ color: '#232323' }}>
                          {story.name}
                        </h3>
                        <p className="text-sm mb-4" style={{ color: '#373618' }}>
                          {story.description}
                        </p>

                        {/* Mock sections */}
                        <div className="mb-4">
                          <p className="text-xs font-medium text-gray-500 mb-2">Sections:</p>
                          <div className="flex flex-wrap gap-1">
                            {story.sections.map((section, sectionIndex) => (
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
                                {section}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2" style={{ color: '#679aa3' }}>
                            <Heart className="h-4 w-4" />
                            <span className="text-xs">Helpful story</span>
                          </div>
                          <Button variant="ghost" size="sm" className="group/btn" style={{ color: randomColor }}>
                            View Sections
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Stories;
