
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Clock, User } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";

const SectionsList = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [sections, setSections] = useState([]);
  const [topicName, setTopicName] = useState("Topic");
  const [hasLoaded, setHasLoaded] = useState(false);

  // Mock sections data
  const mockSections = [
    { 
      id: 1, 
      title: "Getting Started", 
      description: "Learn the fundamentals and basic concepts to begin your journey.",
      readTime: "5 min read",
      author: "Dr. Sarah Johnson"
    },
    { 
      id: 2, 
      title: "Understanding Basics", 
      description: "Deep dive into the core principles and foundational knowledge.",
      readTime: "8 min read",
      author: "Prof. Michael Chen"
    },
    { 
      id: 3, 
      title: "Advanced Techniques", 
      description: "Master advanced strategies and professional-level approaches.",
      readTime: "12 min read",
      author: "Dr. Emily Rodriguez"
    },
    { 
      id: 4, 
      title: "Real-world Examples", 
      description: "Explore practical applications and case studies from industry.",
      readTime: "10 min read",
      author: "James Mitchell"
    },
    { 
      id: 5, 
      title: "Best Practices", 
      description: "Discover proven methods and recommended approaches.",
      readTime: "7 min read",
      author: "Dr. Lisa Wang"
    },
    { 
      id: 6, 
      title: "Common Challenges", 
      description: "Learn how to overcome typical obstacles and difficulties.",
      readTime: "9 min read",
      author: "Robert Taylor"
    },
    { 
      id: 7, 
      title: "Expert Tips", 
      description: "Insider knowledge and professional secrets revealed.",
      readTime: "6 min read",
      author: "Dr. Amanda Foster"
    },
    { 
      id: 8, 
      title: "Case Studies", 
      description: "Detailed analysis of successful implementations and outcomes.",
      readTime: "15 min read",
      author: "Prof. David Kim"
    }
  ];

  useEffect(() => {
    // Simulate loading sections for the topic
    const loadSections = () => {
      setTopicName(`Topic ${topicId}`);
      setSections(mockSections);
      requestAnimationFrame(() => setHasLoaded(true));
    };
    loadSections();
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
            <h1 className="text-2xl font-bold text-black">Sections</h1>
            <p className="text-sm text-gray-600">{topicName}</p>
          </div>
        </header>

        <div ref={gridRef} className="space-y-6">
          {sections.map((section, index) => {
            const randomColor = getConsistentColor(section.title);
            return (
              <Card key={section.id} className={`
                  bg-white/90 backdrop-blur-md shadow-lg overflow-hidden group cursor-pointer transition-all duration-700 hover:shadow-xl hover:scale-[1.02]
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
                        {section.title}
                      </h3>
                      <p className="text-sm mb-4" style={{ color: '#373618' }}>
                        {section.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>{section.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{section.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default SectionsList;
