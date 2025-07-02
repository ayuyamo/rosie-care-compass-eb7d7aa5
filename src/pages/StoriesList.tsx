import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, BookOpen, ExternalLink, Share2, Facebook, Instagram, Linkedin, Twitter, ChevronDown } from "lucide-react";
import { Link, useParams, useLocation } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect, useLayoutEffect } from "react";
import { fetchStoriesBySectionId, fetchSectionNameById, fetchResourcesBySectionId, subscribeToTableChanges } from "@/lib/supabase/supabaseApi";

const StoriesList = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const { sectionId } = useParams<{ sectionId: string }>();
    const location = useLocation();
    const passedSection = location.state?.section;
    const [sectionName, setSectionName] = useState("");
    const [stories, setStories] = useState([]);
    const [resources, setResources] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [openStories, setOpenStories] = useState<string[]>([]);

    const toggleStory = (storyId: string) => {
        setOpenStories(prev =>
            prev.includes(storyId)
                ? prev.filter(id => id !== storyId)
                : [...prev, storyId]
        );
    };

    const getStoryPreview = (content: string, maxLength: number = 200) => {
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength).trim() + "...";
    };

    // Background image for header
    const headerBackgroundImage = passedSection?.image_url || "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=300&fit=crop";

    useEffect(() => {
        const loadData = async () => {
            try {
                if (passedSection) {
                    console.log("Using passed section:", passedSection);
                    setSectionName(passedSection.name);
                    setStories(passedSection.stories || []);
                    setResources(passedSection.resources || []);
                } else {
                    console.log("Fetching stories by section ID:", sectionId);
                    const stories = await fetchStoriesBySectionId(sectionId);
                    const resources = await fetchResourcesBySectionId(sectionId);
                    setSectionName(await fetchSectionNameById(sectionId));
                    setStories(stories || []);
                    setResources(resources || []);
                }
            } catch (err) {
                console.error("Failed to load topic or sections:", err);
            }
        };

        loadData();
        const unsubscribe = subscribeToTableChanges('stories', (payload) => {
            const { eventType, new: newStory, old: oldStory } = payload;

            // Only respond to changes that affect the current section
            const relevantSectionId = eventType === 'DELETE' ? oldStory.section_id : newStory.section_id;
            if (relevantSectionId !== sectionId) return;

            setStories((prevStories) => {
                if (eventType === 'INSERT') {
                    return [...prevStories, newStory];
                }

                if (eventType === 'UPDATE') {
                    return prevStories.map((story) =>
                        story.id === newStory.id ? { ...story, ...newStory } : story
                    );
                }

                if (eventType === 'DELETE') {
                    return prevStories.filter((story) => story.id !== oldStory.id);
                }

                return prevStories;
            });
        });
        return () => {
            unsubscribe();
        };
    }, []);

    useLayoutEffect(() => {
        if (sectionName.length > 0 && stories.length > 0 && resources.length > 0) {
            requestAnimationFrame(() => {
                setHasLoaded(true);
            });
        }
    }, [sectionName, stories, resources]);

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
                navigator.clipboard.writeText(`${text}\n\n${url}`);
                alert('Story link copied to clipboard! You can now paste it on Instagram.');
                break;
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] p-4 pb-24">
            <div className="max-w-2xl mx-auto">
                <header
                    ref={headerRef}
                    className={`relative flex items-center mb-6 p-6 rounded-lg overflow-hidden transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{
                        backgroundImage: `url(${headerBackgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    {/* Half-saturated overlay */}
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

                    {/* Content */}
                    <div className="relative z-10 flex items-center w-full">
                        <Link to={`/topic/${topicId}/sections`} className="mr-4">
                            <Button variant="ghost" size="sm" className="text-[#5a7a85] hover:bg-white/20">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-black">{sectionName}</h1>
                            <p className="text-sm text-gray-700 mt-1">{stories.length} stories</p>
                        </div>
                    </div>
                </header>

                <div ref={gridRef} className="space-y-8">
                    {stories.map((story, index) => {
                        const randomColor = getConsistentColor(story.title);
                        const isOpen = openStories.includes(story.id);
                        const storyPreview = getStoryPreview(story.content);

                        return (
                            <Collapsible key={story.id} open={isOpen} onOpenChange={() => toggleStory(story.id)}>
                                <article className={`
                                    bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-700
                                    ${gridVisible && hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                                `}
                                    style={{
                                        transitionDelay: gridVisible && hasLoaded ? `${index * 150}ms` : '0ms'
                                    }}>

                                    {/* Story Header */}
                                    <div className="px-6 py-4 border-b border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h2 className="text-xl font-bold text-[#232323] mb-2">
                                                    {story.title}
                                                </h2>

                                                {/* Featured People Section */}
                                                {story.people && story.people.length > 0 && (
                                                    <div className="mb-3">
                                                        <p className="text-sm font-medium text-gray-600 mb-2">Featured People:</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {story.people.map((person, personIndex) => (
                                                                <Badge
                                                                    key={personIndex}
                                                                    variant="outline"
                                                                    className="text-xs px-2 py-1 bg-gray-50 text-gray-700 border-gray-200"
                                                                >
                                                                    {person}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <CollapsibleTrigger asChild>
                                                <Button variant="ghost" size="sm" className="ml-auto">
                                                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                                                </Button>
                                            </CollapsibleTrigger>
                                        </div>
                                    </div>

                                    {/* Story Content */}
                                    <div className="px-6 py-4">
                                        <div className="prose prose-gray max-w-none">
                                            <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base">
                                                {isOpen ? story.content : storyPreview}
                                            </div>
                                        </div>
                                        <div className="mt-2 flex gap-2">
                                            {story.content.length > 200 && !isOpen && (
                                                <CollapsibleTrigger asChild>
                                                    <Button variant="link" className="p-0 h-auto text-sm" style={{ color: randomColor }}>
                                                        Read more
                                                    </Button>
                                                </CollapsibleTrigger>
                                            )}
                                            {isOpen && story.content.length > 200 && (
                                                <CollapsibleTrigger asChild>
                                                    <Button variant="link" className="p-0 h-auto text-sm" style={{ color: randomColor }}>
                                                        Show less
                                                    </Button>
                                                </CollapsibleTrigger>
                                            )}
                                        </div>
                                    </div>

                                    {/* Story Footer */}
                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                        <div className="flex items-center justify-end">
                                            {/* Social Sharing */}
                                            <div className="flex items-center space-x-3">
                                                <span className="text-sm text-gray-600 font-medium">Share:</span>
                                                <button
                                                    onClick={() => shareStory('facebook', story.title, story.content)}
                                                    className="p-2.5 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors active:scale-95"
                                                    title="Share on Facebook"
                                                >
                                                    <Facebook className="h-4 w-4 text-blue-600" />
                                                </button>
                                                <button
                                                    onClick={() => shareStory('twitter', story.title, story.content)}
                                                    className="p-2.5 rounded-full bg-sky-100 hover:bg-sky-200 transition-colors active:scale-95"
                                                    title="Share on Twitter"
                                                >
                                                    <Twitter className="h-4 w-4 text-sky-600" />
                                                </button>
                                                <button
                                                    onClick={() => shareStory('linkedin', story.title, story.content)}
                                                    className="p-2.5 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors active:scale-95"
                                                    title="Share on LinkedIn"
                                                >
                                                    <Linkedin className="h-4 w-4 text-blue-700" />
                                                </button>
                                                <button
                                                    onClick={() => shareStory('instagram', story.title, story.content)}
                                                    className="p-2.5 rounded-full bg-pink-100 hover:bg-pink-200 transition-colors active:scale-95"
                                                    title="Share on Instagram"
                                                >
                                                    <Instagram className="h-4 w-4 text-pink-600" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </Collapsible>
                        );
                    })}

                    {resources && resources.length > 0 && (
                        <div className="space-y-3">
                            <p className="text-sm font-semibold text-gray-700">
                                Resources
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {resources.map((resource) => (
                                    <a
                                        key={resource.id}
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md group"
                                    >
                                        {resource.image ? (
                                            <>
                                                <img
                                                    src={resource.image}
                                                    alt={resource.url}
                                                    className="h-5 w-5 rounded-full flex-shrink-0"
                                                />
                                                <span className="truncate max-w-32 group-hover:text-blue-700">
                                                    {new URL(resource.url).hostname}
                                                </span>
                                                <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 opacity-60 group-hover:opacity-100" />
                                            </>
                                        ) : (
                                            <>
                                                <ExternalLink className="h-4 w-4 flex-shrink-0 text-gray-500 group-hover:text-blue-600" />
                                                <span className="truncate max-w-32 group-hover:text-blue-700">
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
