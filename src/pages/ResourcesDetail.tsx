
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, BookOpen, Video, FileText, Globe } from "lucide-react";
import { Link, useParams, useLocation } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect, useLayoutEffect } from "react";

const ResourcesDetail = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const location = useLocation();
  const passedTopic = location.state?.topic;
  const [topicName, setTopicName] = useState("");
  const [sections, setSections] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Mock resource data by type
  const mockResources = {
    articles: [
      { title: "Understanding the Basics", url: "https://example.com/article1" },
      { title: "Advanced Techniques", url: "https://example.com/article2" },
      { title: "Best Practices Guide", url: "https://example.com/article3" }
    ],
    videos: [
      { title: "Introduction Video", url: "https://youtube.com/watch?v=example1" },
      { title: "Tutorial Series", url: "https://youtube.com/watch?v=example2" },
      { title: "Expert Interview", url: "https://youtube.com/watch?v=example3" }
    ],
    documents: [
      { title: "Reference Manual", url: "https://example.com/manual.pdf" },
      { title: "Quick Start Guide", url: "https://example.com/guide.pdf" },
      { title: "Templates Collection", url: "https://example.com/templates.zip" }
    ],
    websites: [
      { title: "Official Documentation", url: "https://docs.example.com" },
      { title: "Community Forum", url: "https://forum.example.com" },
      { title: "Resource Hub", url: "https://resources.example.com" }
    ]
  };

  useEffect(() => {
    if (passedTopic) {
      setTopicName(passedTopic.name);
      // Create mock sections with resources
      const mockSections = passedTopic.sections.map((section, index) => ({
        ...section,
        resources: {
          articles: mockResources.articles.slice(0, Math.ceil(Math.random() * 3) + 1),
          videos: mockResources.videos.slice(0, Math.ceil(Math.random() * 2) + 1),
          documents: mockResources.documents.slice(0, Math.ceil(Math.random() * 2) + 1),
          websites: mockResources.websites.slice(0, Math.ceil(Math.random() * 2) + 1)
        }
      }));
      setSections(mockSections);
    }
  }, [passedTopic]);

  useLayoutEffect(() => {
    if (topicName.length > 0 && sections.length > 0) {
      requestAnimationFrame(() => {
        setHasLoaded(true);
      });
    }
  }, [sections, topicName]);

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

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'articles':
        return FileText;
      case 'videos':
        return Video;
      case 'documents':
        return BookOpen;
      case 'websites':
        return Globe;
      default:
        return ExternalLink;
    }
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
            <h1 className="text-2xl font-bold text-black">{topicName} Resources</h1>
            <p className="text-sm text-gray-600">Helpful resources organized by sections</p>
          </div>
        </header>

        <div ref={gridRef} className="space-y-6">
          {sections.map((section, index) => {
            const randomColor = getConsistentColor(section.name);
            return (
              <Card key={section.id} className={`
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
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: randomColor }}>
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold mb-2" style={{ color: '#232323' }}>
                          {section.name}
                        </h3>
                      </div>
                    </div>

                    {/* Resources by Type */}
                    {Object.entries(section.resources).map(([resourceType, resourceList]) => {
                      if (resourceList.length === 0) return null;
                      
                      const ResourceIcon = getResourceIcon(resourceType);
                      
                      return (
                        <div key={resourceType} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <ResourceIcon className="h-4 w-4" style={{ color: randomColor }} />
                            <p className="text-sm font-medium capitalize" style={{ color: randomColor }}>
                              {resourceType}
                            </p>
                          </div>
                          <div className="space-y-2 ml-6">
                            {resourceList.map((resource, resourceIndex) => (
                              <div key={resourceIndex} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                <span className="text-sm text-gray-700">{resource.title}</span>
                                <a 
                                  href={resource.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-1 text-xs hover:underline"
                                  style={{ color: randomColor }}
                                >
                                  <span>Open</span>
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
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
