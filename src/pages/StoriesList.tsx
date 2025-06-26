
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
            <div className="max-w-md mx-auto">
                <header ref={headerRef} className={`flex items-center mb-6 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Link to="/topics" className="mr-4">
                        <Button variant="ghost" size="sm" className="text-[#5a7a85]">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-black">{sectionName}</h1>
                    </div>
                </header>

                <div ref={gridRef} className="space-y-6">
                    {stories.map((story, index) => {
                        const randomColor = getConsistentColor(story.title);
                        return (
                            <Card key={story.id} className={`
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
                                                {story.title}
                                            </h3>
                                            <p className="text-sm text-[#373618]">
                                                {story.content.split(' ').slice(0, 20).join(' ')}...
                                            </p>
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

export default StoriesList;
