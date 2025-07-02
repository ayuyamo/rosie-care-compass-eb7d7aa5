
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";  
import { ArrowLeft, Clock, Heart, ChevronDown, ExternalLink, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link, useParams, useLocation } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect, useLayoutEffect } from "react";
import { fetchStoriesBySectionId, fetchSectionNameById, fetchResourcesBySectionId, subscribeToTableChanges } from "@/lib/supabase/supabaseApi";

const StoriesPageAlt = () => {
    const { topicId, sectionId } = useParams<{ topicId: string; sectionId: string }>();
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

    const getStoryPreview = (content: string, maxLength: number = 150) => {
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength).trim() + "...";
    };

    // Hero image for the page
    const heroImage = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=400&fit=crop";

    useEffect(() => {
        const loadData = async () => {
            try {
                if (passedSection) {
                    setSectionName(passedSection.name);
                    setStories(passedSection.stories || []);
                    setResources(passedSection.resources || []);
                } else {
                    const stories = await fetchStoriesBySectionId(sectionId);
                    const resources = await fetchResourcesBySectionId(sectionId);
                    setSectionName(await fetchSectionNameById(sectionId));
                    setStories(stories || []);
                    setResources(resources || []);
                }
            } catch (err) {
                console.error("Failed to load stories:", err);
            }
        };

        loadData();
        const unsubscribe = subscribeToTableChanges('stories', (payload) => {
            const { eventType, new: newStory, old: oldStory } = payload;
            const relevantSectionId = eventType === 'DELETE' ? oldStory.section_id : newStory.section_id;
            if (relevantSectionId !== sectionId) return;

            setStories((prevStories) => {
                if (eventType === 'INSERT') return [...prevStories, newStory];
                if (eventType === 'UPDATE') return prevStories.map((story) => story.id === newStory.id ? { ...story, ...newStory } : story);
                if (eventType === 'DELETE') return prevStories.filter((story) => story.id !== oldStory.id);
                return prevStories;
            });
        });
        return unsubscribe;
    }, [sectionId, passedSection]);

    useLayoutEffect(() => {
        if (sectionName.length > 0 && (stories.length > 0 || resources.length >= 0)) {
            requestAnimationFrame(() => setHasLoaded(true));
        }
    }, [sectionName, stories, resources]);

    const colors = ["#d79a8c", "#367588", "#49796B", "#8F9779", "#5a7a85", "#B8860B", "#8B4513", "#556B2F", "#800080", "#008080"];

    const getConsistentColor = (key: string): string => {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = key.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

    const shareStory = (platform: string, storyTitle: string) => {
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Hero Image Section */}
            <div className="relative h-80 overflow-hidden">
                <img
                    src={heroImage}
                    alt="Stories Collection"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Header Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div ref={headerRef} className={`transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <Link to={`/topic/${topicId}/sections`} className="inline-block mb-4">
                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 backdrop-blur-sm">
                                <ArrowLeft className="h-5 w-5 mr-2" />
                                Back to Sections
                            </Button>
                        </Link>
                        <h1 className="text-4xl font-bold text-white mb-2">{sectionName}</h1>
                        <p className="text-white/90 text-lg">{stories.length} inspiring stories to discover</p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-6 pb-24">
                {/* Stories Grid */}
                <div ref={gridRef} className="grid gap-6 md:grid-cols-2 mt-8">
                    {stories.map((story, index) => {
                        const storyColor = getConsistentColor(story.title);
                        const isOpen = openStories.includes(story.id);
                        const storyPreview = getStoryPreview(story.content);

                        return (
                            <Collapsible key={story.id} open={isOpen} onOpenChange={() => toggleStory(story.id)}>
                                <Card className={`
                                    overflow-hidden transition-all duration-700 hover:shadow-xl hover:scale-[1.02] group
                                    ${gridVisible && hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                                `}
                                    style={{
                                        transitionDelay: gridVisible && hasLoaded ? `${index * 100}ms` : '0ms'
                                    }}>
                                    
                                    <CardContent className="p-6">
                                        {/* Story Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-3">
                                                    <Badge className="bg-white/90 text-gray-800 shadow-sm">
                                                        Story #{index + 1}
                                                    </Badge>
                                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                        <div className="flex items-center space-x-1">
                                                            <Clock className="h-4 w-4" />
                                                            <span>{Math.ceil(story.content.split(' ').length / 200)} min read</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <Heart className="h-4 w-4 text-red-500" />
                                                            <span>Inspiring</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                                    {story.title}
                                                </h2>
                                            </div>
                                            <CollapsibleTrigger asChild>
                                                <Button variant="ghost" size="sm" className="ml-2 shrink-0">
                                                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                                                </Button>
                                            </CollapsibleTrigger>
                                        </div>

                                        {/* Story Content */}
                                        <div className="mb-4">
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                                {isOpen ? story.content : storyPreview}
                                            </p>
                                            {story.content.length > 150 && !isOpen && (
                                                <CollapsibleTrigger asChild>
                                                    <Button variant="link" className="mt-2 p-0 h-auto text-sm font-medium" style={{ color: storyColor }}>
                                                        Read full story
                                                    </Button>
                                                </CollapsibleTrigger>
                                            )}
                                        </div>

                                        {/* Social Sharing */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <span className="text-sm font-medium text-gray-600">Share this story:</span>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => shareStory('facebook', story.title)}
                                                    className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
                                                    title="Share on Facebook"
                                                >
                                                    <Facebook className="h-4 w-4 text-blue-600" />
                                                </button>
                                                <button
                                                    onClick={() => shareStory('twitter', story.title)}
                                                    className="p-2 rounded-full bg-sky-50 hover:bg-sky-100 transition-colors"
                                                    title="Share on Twitter"
                                                >
                                                    <Twitter className="h-4 w-4 text-sky-600" />
                                                </button>
                                                <button
                                                    onClick={() => shareStory('linkedin', story.title)}
                                                    className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
                                                    title="Share on LinkedIn"
                                                >
                                                    <Linkedin className="h-4 w-4 text-blue-700" />
                                                </button>
                                                <button
                                                    onClick={() => shareStory('instagram', story.title)}
                                                    className="p-2 rounded-full bg-pink-50 hover:bg-pink-100 transition-colors"
                                                    title="Share on Instagram"
                                                >
                                                    <Instagram className="h-4 w-4 text-pink-600" />
                                                </button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Collapsible>
                        );
                    })}
                </div>

                {/* Resources Section */}
                {resources && resources.length > 0 && (
                    <div className="mt-12 space-y-4">
                        <h3 className="text-xl font-bold text-gray-900">Additional Resources</h3>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {resources.map((resource) => (
                                <a
                                    key={resource.id}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md group"
                                >
                                    {resource.image ? (
                                        <img
                                            src={resource.image}
                                            alt={resource.url}
                                            className="h-6 w-6 rounded-full flex-shrink-0"
                                        />
                                    ) : (
                                        <ExternalLink className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-600" />
                                    )}
                                    <span className="truncate text-gray-700 group-hover:text-gray-900">
                                        {new URL(resource.url).hostname}
                                    </span>
                                    <ExternalLink className="h-4 w-4 flex-shrink-0 opacity-40 group-hover:opacity-70" />
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {stories.length === 0 && hasLoaded && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No stories found</h3>
                        <p className="text-gray-600">This section doesn't have any stories yet.</p>
                    </div>
                )}
            </div>
            <BottomNavigation />
        </div>
    );
};

export default StoriesPageAlt;
