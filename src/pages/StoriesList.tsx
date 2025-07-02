
import { BookOpen } from "lucide-react";
import { useParams, useLocation } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import StoryListHeader from "@/components/StoryListHeader";
import StoryItem from "@/components/StoryItem";
import ResourcesList from "@/components/ResourcesList";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useConsistentColor } from "@/hooks/useConsistentColor";
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

    const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

    return (
        <div className="min-h-screen bg-[#f8f9fa] p-4 pb-24">
            <div className="max-w-2xl mx-auto">
                <StoryListHeader 
                    topicId={topicId!}
                    sectionName={sectionName}
                    storiesCount={stories.length}
                    headerVisible={headerVisible}
                    headerRef={headerRef}
                />

                <div ref={gridRef} className="space-y-8">
                    {stories.map((story, index) => {
                        const randomColor = useConsistentColor(story.title);
                        const isOpen = openStories.includes(story.id);

                        return (
                            <StoryItem
                                key={story.id}
                                story={story}
                                index={index}
                                isOpen={isOpen}
                                onToggle={() => toggleStory(story.id)}
                                gridVisible={gridVisible}
                                hasLoaded={hasLoaded}
                                randomColor={randomColor}
                            />
                        );
                    })}

                    <ResourcesList resources={resources} />
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
