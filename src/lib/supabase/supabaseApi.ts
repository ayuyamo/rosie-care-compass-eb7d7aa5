import { supabase } from './supabaseClient';

/** Fetch all topics */
export const fetchTopics = async () => {
  const { data, error } = await supabase
    .from('topics')
    .select('id, name, description, image_url')
    .order('created_at', { ascending: true });

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

/** Fetch all resources for a given section */
export const fetchResourcesBySectionId = async (sectionId: string) => {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('section_id', sectionId)
    .order('created_at', { ascending: true });

  if (error) throw new Error(`fetchResourcesBySectionId: ${error.message}`);
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

export const fetchSectionById = async (sectionId: string) => {
  const { data, error } = await supabase
    .from('sections')
    .select('*')
    .eq('id', sectionId)
    .single(); // because you're expecting one row

  if (error) {
    console.error('Error fetching section:', error);
    return null;
  }

  return data;
};

export const fetchPoems = async () => {
  const { data, error } = await supabase
    .from('poems')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw new Error(`fetchPoems: ${error.message}`);
  return data;
};

export const subscribeToTableChanges = (
  table: string,
  callback: (payload: any) => void
) => {
  const channel = supabase
    .channel(`realtime:${table}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: table,
      },
      (payload) => {
        console.log(`🔔 Change detected on table "${table}":`, payload);
        callback(payload);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
