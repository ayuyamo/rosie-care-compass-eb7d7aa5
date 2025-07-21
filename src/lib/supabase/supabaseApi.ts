import { supabase } from './supabaseClient';

/** Fetch all topics */
export const fetchChapters = async () => {
  const { data, error } = await supabase
    .from('chapters')
    .select('id, name, description, image_url')
    .order('created_at', { ascending: true });

  if (error) throw new Error(`fetchChapters: ${error.message}`);
  return data;
};

/** Fetch all sections for a given topic */
export const fetchTopicsByChapterId = async (chapterId: string) => {
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('chapter_id', chapterId)
    .order('order_index', { ascending: true });

  if (error) throw new Error(`fetchTopicsByChapterId: ${error.message}`);
  return data;
};

/** Fetch all stories for a given section */
export const fetchStoriesByTopicId = async (topicId: string) => {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('topic_id', topicId)
    .order('created_at', { ascending: true });

  if (error) throw new Error(`fetchStoriesByTopicId: ${error.message}`);
  return data;
};

/** Fetch all resources for a given section */
export const fetchResourcesByTopicId = async (topicId: string) => {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('topic_id', topicId)
    .order('created_at', { ascending: true });

  if (error) throw new Error(`fetchResourcesByTopicId: ${error.message}`);
  return data;
};

/** Optional: Fetch a single topic by ID */
export const fetchChapterById = async (chapterId: string) => {
  const { data, error } = await supabase
    .from('chapters')
    .select('*')
    .eq('id', chapterId)
    .single();

  if (error) throw new Error(`fetchChapterById: ${error.message}`);
  return data;
};

export const fetchFlashcardsByChapterId = async (chapterId: string) => {
  const { data, error } = await supabase
    .from('flashcards')
    .select('*')
    .eq('chapter_id', chapterId);

  if (error) {
    console.error('Error fetching flashcards: ', error);
    return null;
  }

  return data;
};

export const fetchTopicById = async (topicId: string) => {
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('id', topicId)
    .single(); // because you're expecting one row

  if (error) {
    console.error('Error fetching topic:', error);
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

export const fetchBookDetails = async (bookId: string) => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', bookId)
    .single();
  if (error) throw new Error(`fetchBookDetails: ${error.message}`);
  return data;
};

export const fetchBookChapters = async (bookId: string) => {
  const { data, error } = await supabase
    .from('book_summary')
    .select('*')
    .eq('book_id', bookId)
    .order('chapter_order', { ascending: true });

  if (error) throw new Error(`fetchBookChapters: ${error.message}`);
  return data;
};

export const fetchMusicInfo = async () => {
  const { data, error } = await supabase
    .from('music')
    .select('name, icon_url, description, url')
    .order('created_at', { ascending: true });

  if (error) throw new Error(`Error fetching music info: ${error.message}`);
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
