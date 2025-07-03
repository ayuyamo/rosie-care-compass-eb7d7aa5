
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, BookOpen, Users, MessageCircle, Compass, Shield, Home, Scale, ArrowRight, Sparkles, FolderClosed } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect, useLayoutEffect } from "react";
import { fetchSectionsByTopicId, subscribeToTableChanges, fetchTopics } from "@/lib/supabase/supabaseApi";

// Default colors for modules
const colors = [
  "#BDB76B", "#8F9779", "#679aa3", "#999999", "#CC9999", "#c3b4a4",
  "#d79a8c", "#367588", "#49796B", "#5a7a85", "#B8860B", "#8B4513"
];

// Default icons for modules
const defaultIcons = [
  Compass, MessageCircle, Home, Shield, Heart, Sparkles,
  BookOpen, Users, Scale, ArrowRight
];

const getConsistentColor = (title: string): string => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const getConsistentIcon = (title: string) => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % defaultIcons.length;
  return defaultIcons[index];
};

export const FloatingModuleGrid = () => {
  const [topics, setTopics] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Subscribe to changes in the topics table
    const loadAndSetTopics = async () => {
      const topics = await fetchTopics();
      setTopics(topics);
    };
    loadAndSetTopics();
    const unsubscribe = subscribeToTableChanges('topics', (newData) => {
      console.log('🔄 Change received:', newData);
      loadAndSetTopics();
    });
    return () => {
      unsubscribe(); // Clean up subscription on unmount
    };
  }, []);

  useLayoutEffect(() => {
    if (topics.length > 0) {
      requestAnimationFrame(() => {
        setHasLoaded(true);
      });
    }
  }, [topics]);

  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <section className="relative z-10 py-6">
      <div className="max-w-md mx-auto px-4">
        <h3 ref={titleRef} className={`text-xl font-bold text-[#232323] mb-4 transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Resources
        </h3>

        <div ref={gridRef} className={`grid grid-cols-2 gap-4 mb-4 transition-all duration-1000 ${gridVisible && hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
          {topics.slice(0, 6).map((topic) => {
            const color = getConsistentColor(topic.name);
            const IconComponent = getConsistentIcon(topic.name);

            return (
              <Link key={topic.id} to={`/topic/${topic.id}/resources/detail`} className="block">
                <Card className="bg-white/60 backdrop-blur-md border border-gray-200 p-4 text-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: color }}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-[#232323] font-bold text-sm mb-1">{topic.name}</h4>
                  <p className="text-[#373618] text-xs">{topic.description}</p>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/resources">
            <button
              className="w-full inline-flex items-center rounded-md justify-center min-w-[140px] md:min-w-[170px] h-12 px-4 shadow-lg border-2 border-[#756b48] text-[#756b48] font-semibold text-base leading-6 tracking-tight bg-white hover:text-[#06f] hover:border-[#06f] focus:text-[#171e29] transition-all duration-300"
            >
              Explore Resources
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
