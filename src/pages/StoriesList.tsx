
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Clock, User, Heart, ArrowRight } from "lucide-react";
import { Link, useParams, useLocation } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect, useLayoutEffect } from "react";
import { fetchStoriesBySectionId, fetchSectionNameById } from "@/lib/supabase/supabaseApi";

const StoriesList = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const { sectionId } = useParams<{ sectionId: string }>();
    const location = useLocation();
    const passedSection = location.state?.section;
    const [sectionName, setSectionName] = useState("");
    const [stories, setStories] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                if (passedSection) {
                    console.log("Using passed section:", passedSection);
                    setSectionName(passedSection.name);
                    setStories(passedSection.stories || []);
                } else {
                    console.log("Fetching stories by section ID:", sectionId);
                    const stories = await fetchStoriesBySectionId(sectionId);

                    setSectionName(await fetchSectionNameById(sectionId));
                    setStories(stories || []);
                }
            } catch (err) {
                console.error("Failed to load topic or sections:", err);
            }
        };

        loadData();
    }, [sectionId, passedSection]);

    useLayoutEffect(() => {
        if (sectionName.length > 0 && stories.length > 0) {
            requestAnimationFrame(() => {
                setHasLoaded(true);
            });
        }
    }, [sectionName, stories]);

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
            <div className="max-w-2xl mx-auto">
                <header ref={headerRef} className={`flex items-center mb-6 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Link to={`/topic/${topicId}/sections`} className="mr-4">
                        <Button variant="ghost" size="sm" className="text-[#5a7a85]">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-black">{sectionName}</h1>
                        <p className="text-sm text-gray-600 mt-1">{stories.length} stories</p>
                    </div>
                </header>

                <div ref={gridRef} className="space-y-8">
                    {stories.map((story, index) => {
                        const randomColor = getConsistentColor(story.title);
                        return (
                            <article key={story.id} className={`
                                bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-700
                                ${gridVisible && hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                            `}
                            style={{
                                transitionDelay: gridVisible && hasLoaded ? `${index * 150}ms` : '0ms'
                            }}>
                                {/* Story Header */}
                                <div className="px-6 py-4 border-b border-gray-100">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: randomColor }}>
                                            <BookOpen className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-[#232323]">
                                                {story.title}
                                            </h2>
                                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                                <div className="flex items-center space-x-1">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{Math.ceil(story.content.split(' ').length / 200)} min read</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Heart className="h-4 w-4" />
                                                    <span>Inspiring</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Story Content */}
                                <div className="px-6 py-6">
                                    <div className="prose prose-gray max-w-none">
                                        <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base">
                                            {story.content}
                                        </div>
                                    </div>
                                </div>

                                {/* Story Footer */}
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <Badge 
                                            variant="secondary" 
                                            className="text-xs"
                                            style={{
                                                backgroundColor: `${randomColor}20`,
                                                color: randomColor,
                                                border: `1px solid ${randomColor}40`
                                            }}
                                        >
                                            Story #{index + 1}
                                        </Badge>
                                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                                            <span>Share your thoughts</span>
                                            <Heart className="h-3 w-3" />
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {stories.length === 0 && hasLoaded && (
                    <div className="text-center py-12">
                        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No stories found in this section.</p>
                    </div>
                )}
            </div>
            <BottomNavigation />
        </div>
    );
};

export default StoriesList;
