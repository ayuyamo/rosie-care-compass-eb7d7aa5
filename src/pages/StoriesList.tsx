import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Clock, User, Heart, ArrowRight, ExternalLink, Share2, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link, useParams, useLocation } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect, useLayoutEffect } from "react";
import { fetchStoriesBySectionId, fetchSectionNameById, fetchResourcesByStoryId } from "@/lib/supabase/supabaseApi";

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
                    const storiesWithResources = await Promise.all(
                        passedSection.stories.map(async (story) => {
                            const resources = await fetchResourcesByStoryId(story.id);
                            return {
                                ...story,
                                resources: resources.map((r) => {
                                    return {
                                        id: r.id,
                                        url: r.url,
                                        image: r.image,
                                    };
                                }),
                            };
                        })
                    );
                    setStories(storiesWithResources || []);
                } else {
                    console.log("Fetching stories by section ID:", sectionId);
                    const stories = await fetchStoriesBySectionId(sectionId);
                    const storiesWithResources = await Promise.all(
                        stories.map(async (story) => {
                            const resources = await fetchResourcesByStoryId(story.id);
                            return {
                                ...story,
                                resources: resources.map((r) => {
                                    return {
                                        id: r.id,
                                        url: r.url,
                                        image: r.image,
                                    };
                                }),
                            };
                        })
                    );
                    setSectionName(await fetchSectionNameById(sectionId));
                    setStories(storiesWithResources || []);
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

    const shareStory = (platform: string, storyTitle: string, storyContent: string) => {
        const url = window.location.href;
        const text = `Check out this inspiring story: "${storyTitle}"`;
        
        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'instagram':
                // Instagram doesn't support direct sharing via URL, so we'll copy to clipboard
                navigator.clipboard.writeText(`${text}\n\n${url}`);
                alert('Story link copied to clipboard! You can now paste it on Instagram.');
                break;
        }
    };

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
                                    <div className="flex items-center justify-between mb-4">
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
                                        
                                        {/* Social Sharing */}
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs text-gray-500 mr-2">Share:</span>
                                            <button
                                                onClick={() => shareStory('facebook', story.title, story.content)}
                                                className="p-1.5 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                                                title="Share on Facebook"
                                            >
                                                <Facebook className="h-3.5 w-3.5 text-blue-600" />
                                            </button>
                                            <button
                                                onClick={() => shareStory('twitter', story.title, story.content)}
                                                className="p-1.5 rounded-full bg-sky-100 hover:bg-sky-200 transition-colors"
                                                title="Share on Twitter"
                                            >
                                                <Twitter className="h-3.5 w-3.5 text-sky-600" />
                                            </button>
                                            <button
                                                onClick={() => shareStory('linkedin', story.title, story.content)}
                                                className="p-1.5 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                                                title="Share on LinkedIn"
                                            >
                                                <Linkedin className="h-3.5 w-3.5 text-blue-700" />
                                            </button>
                                            <button
                                                onClick={() => shareStory('instagram', story.title, story.content)}
                                                className="p-1.5 rounded-full bg-pink-100 hover:bg-pink-200 transition-colors"
                                                title="Share on Instagram"
                                            >
                                                <Instagram className="h-3.5 w-3.5 text-pink-600" />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {story.resources && story.resources.length > 0 && (
                                        <div className="space-y-3">
                                            <p className="text-sm font-medium text-gray-700 flex items-center">
                                                <ExternalLink className="h-4 w-4 mr-2 text-gray-500" />
                                                Resources:
                                            </p>
                                            <div className="flex flex-wrap gap-3">
                                                {story.resources.map((resource) => (
                                                    <a
                                                        key={resource.id}
                                                        href={resource.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
                                                    >
                                                        {resource.image ? (
                                                            <>
                                                                <img 
                                                                    src={resource.image} 
                                                                    alt={resource.url} 
                                                                    className="h-5 w-5 rounded-full flex-shrink-0" 
                                                                />
                                                                <span className="truncate max-w-32">
                                                                    {new URL(resource.url).hostname}
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <ExternalLink className="h-4 w-4 flex-shrink-0" />
                                                                <span className="truncate max-w-32">
                                                                    {new URL(resource.url).hostname}
                                                                </span>
                                                            </>
                                                        )}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
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
