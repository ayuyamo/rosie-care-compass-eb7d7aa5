import { supabase } from './supabaseClient';

/** Fetch all topics */
export const fetchTopics = async () => {
  const { data, error } = await supabase
    .from('topics')
    .select('name, description')
    .order('created_at', { ascending: false });

  if (error) throw new Error(`fetchTopics: ${error.message}`);
  return data;
};

/** Fetch all sections for a given topic */
export const fetchSectionsByTopicId = async (topicId: string) => {
  const { data, error } = await supabase
    .from('sections')
    .select('*')
    .eq('topic_id', topicId)
    .order('order_index', { ascending: true });

  if (error) throw new Error(`fetchSectionsByTopicId: ${error.message}`);
  return data;
};

/** Fetch all stories for a given section */
export const fetchStoriesBySectionId = async (sectionId: string) => {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('section_id', sectionId)
    .order('created_at', { ascending: true });

  if (error) throw new Error(`fetchStoriesBySectionId: ${error.message}`);
  return data;
};

/** Fetch all resources for a given story */
export const fetchResourcesByStoryId = async (storyId: string) => {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('story_id', storyId)
    .order('created_at', { ascending: true });

  if (error) throw new Error(`fetchResourcesByStoryId: ${error.message}`);
  return data;
};

/** Optional: Fetch a single topic by ID */
export const fetchTopicById = async (topicId: string) => {
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('id', topicId)
    .single();

  if (error) throw new Error(`fetchTopicById: ${error.message}`);
  return data;
};
