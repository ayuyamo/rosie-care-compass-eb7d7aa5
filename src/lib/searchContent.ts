import { supabase } from './supabase/supabaseClient';
import { fetchTopicById } from './supabase/supabaseApi';

export async function searchContent(query: string) {
  if (!query.trim()) return null;

  const pattern = `%${query}%`;
  const [chapters, books, topics, stories] = await Promise.all([
    supabase
      .from('chapters')
      .select('*')
      .or(`name.ilike."${pattern}",description.ilike."${pattern}"`),

    supabase
      .from('books')
      .select('*')
      .or(
        `title.ilike."${pattern}",description.ilike."${pattern}",author.ilike."${pattern}"`
      ),

    supabase.from('topics').select('*').ilike('name', pattern),

    supabase
      .from('stories')
      .select('*')
      .or(`title.ilike.${pattern},content.ilike.${pattern}`),
  ]);

  if (stories.data) {
    stories.data = await Promise.all(
      stories.data.map(async (data) => {
        const topic = await fetchTopicById(data.topic_id);
        return { ...data, chapter_id: topic.chapter_id };
      })
    );
  }

  const results = {
    chapters: chapters.data || [],
    books: books.data || [],
    topics: topics.data || [],
    stories: stories.data || [],
  };

  if (Object.values(results).every((item) => item.length === 0)) return null;

  return results;
}
