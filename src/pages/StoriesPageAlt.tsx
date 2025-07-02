
import { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fetchStoriesBySectionId, fetchSectionNameById, fetchResourcesBySectionId, subscribeToTableChanges } from "@/lib/supabase/supabaseApi";
import { HeroSection } from "@/components/stories/HeroSection";
import { SectionHeader } from "@/components/stories/SectionHeader";
import { StoryCardAlt } from "@/components/stories/StoryCardAlt";
import { ResourcesSection } from "@/components/stories/ResourcesSection";
import { EmptyState } from "@/components/stories/EmptyState";

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <HeroSection heroImage={heroImage} />
            
            <SectionHeader 
                sectionName={sectionName}
                storiesCount={stories.length}
                isVisible={headerVisible}
                headerRef={headerRef}
                topicId={topicId!}
            />

            <div className="max-w-4xl mx-auto p-6 pb-24">
                <div ref={gridRef} className="grid gap-6 md:grid-cols-2 mt-8">
                    {stories.map((story, index) => {
                        const storyColor = getConsistentColor(story.title);
                        const isOpen = openStories.includes(story.id);

                        return (
                            <StoryCardAlt
                                key={story.id}
                                story={story}
                                index={index}
                                isOpen={isOpen}
                                onToggle={toggleStory}
                                isVisible={gridVisible}
                                hasLoaded={hasLoaded}
                                storyColor={storyColor}
                            />
                        );
                    })}
                </div>

                <ResourcesSection resources={resources} />

                {stories.length === 0 && hasLoaded && <EmptyState />}
            </div>
            
            <BottomNavigation />
        </div>
    );
};

export default StoriesPageAlt;
