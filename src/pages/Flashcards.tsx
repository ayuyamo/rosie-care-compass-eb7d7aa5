import BottomNavigation from "@/components/BottomNavigation";
import { fetchChapters, fetchTopicsByChapterId, subscribeToTableChanges } from "@/lib/supabase/supabaseApi";
import { useState, useEffect, useLayoutEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Heart, Clock, ArrowRight } from "lucide-react";

const Flashcards = () => {
    const [chapters, setChapters] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        // Subscribe to changes in the topics table
        const loadAndSetChapters = async () => {
            const chapters = await fetchChapters();
            setChapters(chapters);
            console.log('chapters set as: ', chapters)
        }
        loadAndSetChapters();
        const unsubscribeChapters = subscribeToTableChanges('chapters', (newData) => {
            const { eventType, new: change, old: oldChapter } = newData;
            setChapters((prevChapters) => {
                if (eventType === 'INSERT') {
                    return [...prevChapters, change];
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
        return () => {
            unsubscribeChapters(); // Clean up subscription on unmount
        };
    }, []);

    useLayoutEffect(() => {
        if (chapters.length > 0) {
            requestAnimationFrame(() => {
                setHasLoaded(true);
            });
        }
    }, [chapters]);

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
                    <h1 className="text-2xl font-bold text-black">
                        Flashcards by Chapters
                    </h1>
                </header>

                <div ref={gridRef} className="space-y-4">
                    {chapters.map((chapter, index) => {
                        const randomColor = getConsistentColor(chapter.name);
                        return (
                            <div key={chapter.id}>
                                <Card className={`
                    bg-white/90 backdrop-blur-md shadow-lg overflow-hidden group cursor-pointer will-change-transform transition-all duration-700 hover:shadow-xl hover:scale-[1.02]
                    ${gridVisible && hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                  `}
                                    style={{
                                        transitionDelay: gridVisible && hasLoaded ? `${index * 150}ms` : '0ms',
                                        position: "relative",
                                    }}>

                                    <CardContent className="p-6">
                                        <div className="space-y-4 flex justify-between">
                                            <div>
                                                <h3 className="text-lg font-bold mb-2" style={{ color: '#232323' }}>
                                                    {chapter.name}
                                                </h3>
                                                <p className="text-sm mb-4" style={{ color: '#373618' }}>
                                                    {chapter.description}
                                                </p>
                                            </div>


                                            <div className="flex items-center justify-between">
                                                <Link to={`/flashcards/${chapter.id}`}
                                                    state={{ chapter }}
                                                >
                                                    <Button variant="ghost" size="sm" className="group/btn" style={{ color: randomColor }}>
                                                        View flashcards
                                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
            <BottomNavigation />
        </div>
    )
}

export default Flashcards;