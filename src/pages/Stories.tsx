import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, BookOpen, ExternalLink, Share2, Facebook, Instagram, Linkedin, Twitter, ChevronDown } from "lucide-react";
import { Link, useParams, useLocation } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect, useLayoutEffect } from "react";
import { fetchStoriesByTopicId, fetchTopicById, fetchResourcesByTopicId, subscribeToTableChanges } from "@/lib/supabase/supabaseApi";
import { Slide, ToastContainer, Zoom, toast } from "react-toastify";
import Submit from "@/components/Submit";
import { StoriesSkeleton } from "@/components/ui/skeletons";

const Stories = () => {
    const { chapterId } = useParams<{ chapterId: string }>();
    const { topicId } = useParams<{ topicId: string }>();
    const location = useLocation();
    const passedTopic = location.state?.topic;
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    const [topicName, setTopicName] = useState("");
    const [stories, setStories] = useState([]);
    const [resources, setResources] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [openStories, setOpenStories] = useState<string[]>([]);
    const [scrollTargetId, setScrollTargetId] = useState<string | null>(null);
    const [intro, setIntro] = useState('');

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

    useEffect(() => {
        const loadData = async () => {
            try {
                if (passedTopic) {
                    console.log("Using passed topic:", passedTopic);
                    setTopicName(passedTopic.name);
                    setIntro(passedTopic.intro);
                    setStories(passedTopic.stories || []);
                    setResources(passedTopic.resources || []);
                    setBackgroundImage(passedTopic.image_url || null);
                } else {
                    console.log("Fetching stories by topic ID:", topicId);
                    const stories = await fetchStoriesByTopicId(topicId);
                    const resources = await fetchResourcesByTopicId(topicId);
                    const topic = await fetchTopicById(topicId);
                    setIntro(topic.intro);
                    setTopicName(topic.name);
                    setStories(stories || []);
                    setResources(resources || []);
                    setBackgroundImage(topic.image_url || null);
                }
            } catch (err) {
                console.error("Failed to load topic or sections:", err);
            }
        };

        loadData();
        const unsubscribeStories = subscribeToTableChanges('stories', (payload) => {
            const { eventType, new: newStory, old: oldStory } = payload;

            setStories((prevStories) => {
                if (topicId === (eventType === 'DELETE' ? oldStory.topic_id : newStory.topic_id)) {
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
                }

                return prevStories;
            });
        });

        const unsubscribeResources = subscribeToTableChanges('resources', (payload) => {
            const { eventType, new: newResource, old: oldResource } = payload;
            setResources((prevResources) => {
                if (topicId === (eventType === 'DELETE' ? oldResource.topic_id : newResource.topic_id)) {
                    if (eventType === 'INSERT') {
                        return [...prevResources, newResource];
                    }

                    if (eventType === 'UPDATE') {
                        return prevResources.map((resource) =>
                            resource.id === newResource.id ? { ...resource, ...newResource } : resource
                        );
                    }

                    if (eventType === 'DELETE') {
                        return prevResources.filter((resource) => resource.id !== oldResource.id);
                    }
                }

                return prevResources;
            });
        });
        return () => {
            unsubscribeStories();
            unsubscribeResources();
        };
    }, []);

    // Auto-scroll to the story if storyId is in the URL
    useEffect(() => {
        if (!hasLoaded) return;
        const params = new URLSearchParams(window.location.search);
        const storyId = params.get("storyId");
        console.log('storyId from URL:', storyId);

        if (storyId) {
            setScrollTargetId(storyId);
        }
    }, [hasLoaded]);


    useLayoutEffect(() => {
        if (topicName.length > 0 && stories.length > 0 && resources.length > 0) {
            setHasLoaded(true);
        }
    }, [topicName, stories, resources]);

    const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(window.innerHeight, hasLoaded);
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(window.innerHeight, hasLoaded);
    const { ref: imgRef, isVisible: imgVisible } = useScrollAnimation(window.innerHeight, hasLoaded);

    if (!hasLoaded || stories.length === 0) {
        return <StoriesSkeleton />;
    }

    const handleShare = async ({ title, text, url }) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url
                });
                console.log('Shared successfully');
            } catch (error) {
                console.error('Sharing failed', error);
            }
        } else {
            // Fallback for unsupported browsers
            try {
                await navigator.clipboard.writeText(url);
                toast.success('Link copied to clipboard! Now you can share it on social media.');
            } catch (err) {
                console.error('Clipboard write failed', err);
                toast.error('Copy failed');
            }
        }
    };

    return (
        <div className="min-h-screen">
            <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover transition={Slide} />
            <header
                ref={headerRef}
                className={`relative flex items-center mb-6 pt-4 rounded-lg overflow-hidden transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                {/* Content */}
                <div className="relative z-10 flex flex-wrap items-center w-full">
                    <Link to={`/chapters/${chapterId}/topics`} className="mr-4">
                        <Button variant="ghost" size="sm" className="text-[#5a7a85] hover:bg-white/20">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-black">Topic: <span className='italic'>{topicName}</span></h1>
                        <p className="text-base text-gray-700 mt-1">{stories.length} stories</p>
                    </div>
                </div>
            </header>

            <div ref={imgRef} className={`relative mb-8 p-10 flex items-center justify-center transition-all duration-1000 ${imgVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-lg z-0" />
                <div className="relative z-10 p-2 text-white text-base max-w-md italic text-center">
                    <div className="inline-block border-t border-white w-14 mx-auto" />
                    <div className="mt-1 px-4 py-2 inline-block">
                        {intro}
                    </div>
                    <div className="inline-block border-b border-white w-14 mx-auto" />
                </div>
            </div>

            <div ref={gridRef} className="space-y-8 mb-8">
                {stories.map((story, index) => {
                    const isOpen = openStories.includes(story.id);
                    const storyPreview = getStoryPreview(story.content);
                    const storyTargetScroll = (el: HTMLElement | null) => {
                        if (el && scrollTargetId === story.id) {
                            console.log("Scrolling to story:", story.id);
                            // Scroll when the element is actually mounted in the DOM
                            el.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                    };

                    return (
                        <Collapsible id={`story-${story.id}`} key={story.id} open={isOpen} onOpenChange={() => toggleStory(story.id)}>
                            <article className={`
                                    bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-700
                                    ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                                `}
                                style={{
                                    transitionDelay: gridVisible ? `${index * 150}ms` : '0ms'
                                }}>

                                {/* Story Header */}
                                <div ref={storyTargetScroll} className="px-6 py-4 border-b border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h2 className="text-xl font-bold text-[#232323] mb-2">
                                                {story.title}
                                            </h2>

                                            {/* Featured People Section */}
                                            {story.people && story.people.length > 0 && (
                                                <div className="mb-3 mt-4">
                                                    <div className="flex flex-wrap gap-2">
                                                        {story.people.map((person, personIndex) => (
                                                            <Badge
                                                                key={personIndex}
                                                                variant="outline"
                                                                className="text-base text-center px-3 py-2 bg-gray-50 text-gray-700 border-gray-200"
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
                                                <Button variant="link" className="p-0 h-auto text-base text-gray-600">
                                                    Read more
                                                </Button>
                                            </CollapsibleTrigger>
                                        )}
                                        {isOpen && story.content.length > 200 && (
                                            <CollapsibleTrigger asChild>
                                                <Button variant="link" className="p-0 h-auto text-base text-gray-600">
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
                                            <span className="text-base text-gray-600 font-medium">Share story:</span>
                                            <button onClick={() => handleShare({
                                                title: "Check out this story!",
                                                text: "Here's something interesting I found.",
                                                url: `${window.location.origin}${window.location.pathname}?storyId=${story.id}`
                                            })} className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors active:scale-95" title="Share this story">
                                                <Share2 className="h-4 w-4 text-gray-600" />
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
                        <div className="relative inline-block rounded-md overflow-hidden">
                            {/* Blurred background */}
                            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-md"></div>

                            {/* Text content */}
                            <p className="relative z-10 text-base font-semibold text-[#211414] px-3 py-1">
                                Resources
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {resources.map((resource) => (
                                <a
                                    key={resource.id}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-base text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md group"
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

            {stories.length === 0 && (
                <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No stories found in this section.</p>
                </div>
            )}
            <Submit />
            <BottomNavigation />
        </div>
    );
};

export default Stories;
