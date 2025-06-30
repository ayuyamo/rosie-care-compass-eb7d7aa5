

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, ExternalLink, BookOpen, Video, FileText, Globe, ChevronDown } from "lucide-react";
import { Link, useParams, useLocation } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect, useLayoutEffect } from "react";
import { fetchSectionsByTopicId, fetchStoriesBySectionId, fetchResourcesBySectionId, fetchTopicById } from "@/lib/supabase/supabaseApi";
import { subscribeToTableChanges } from "@/lib/supabase/supabaseApi";

const ResourcesDetail = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const location = useLocation();
  const passedData = location.state?.topic;
  const [topicName, setTopicName] = useState("");
  const [sections, setSections] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  useEffect(() => {
    const loadAndSetResources = async () => {
      if (!topicId) return;
      const sections = await fetchSectionsByTopicId(topicId);

      const sectionsWithStories = await Promise.all(
        sections.map(async (section) => {
          const resources = await fetchResourcesBySectionId(section.id);

          return {
            ...section,
            resources: resources,
          };
        })
      );
      const topic = await fetchTopicById(topicId);
      setTopicName(topic.name);
      setSections(sectionsWithStories);
    }
    if (passedData) {
      setTopicName(passedData.name);
      setSections(passedData.sections);
    } else {
      loadAndSetResources();
    }
    const unsubscribe = subscribeToTableChanges('topics', (newData) => {
      console.log('🔄 Change received:', newData);
      loadAndSetResources();
    });
    return () => {
      unsubscribe(); // Clean up subscription on unmount
    };
  }, []);

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
            const isOpen = openSections[section.id] || false;
            
            return (
              <Collapsible key={section.id} open={isOpen} onOpenChange={() => toggleSection(section.id)}>
                <Card className={`
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
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full p-0 h-auto text-left">
                              <div className="flex justify-between items-start w-full gap-2">
                                <div className="flex flex-col items-start flex-1 min-w-0">
                                  <h3 className="text-lg font-bold text-left leading-tight" style={{ color: '#232323', wordWrap: 'break-word', hyphens: 'auto' }}>
                                    {section.name}
                                  </h3>
                                  {/* Show resource count when collapsed, positioned closer to title */}
                                  {!isOpen && section.resources?.length > 0 && (
                                    <Badge variant="secondary" className="text-xs mt-1">
                                      {section.resources.length} resource{section.resources.length !== 1 ? 's' : ''}
                                    </Badge>
                                  )}
                                </div>
                                <ChevronDown className={`h-5 w-5 transition-transform duration-300 flex-shrink-0 mt-0.5 ${isOpen ? 'rotate-180' : ''}`} />
                              </div>
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                      </div>

                      {/* Collapsible Resources Content with smooth slide down transitions */}
                      <CollapsibleContent className="overflow-hidden transition-all duration-300 ease-in-out data-[state=closed]:animate-accordion-down data-[state=open]:animate-accordion-up">
                        {section.resources?.length > 0 && (
                          <div className="space-y-2 ml-16 animate-fade-in">
                            {section.resources.map((resource, resourceIndex) => (
                              <div
                                key={resourceIndex}
                                className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                              >
                                <a
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-1 text-xs hover:underline"
                                >
                                  <span className="break-all text-blue-600">{resource.url}</span>
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </div>
                            ))}
                          </div>
                        )}
                      </CollapsibleContent>
                    </div>
                  </CardContent>
                </Card>
              </Collapsible>
            );
          })}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default ResourcesDetail;

