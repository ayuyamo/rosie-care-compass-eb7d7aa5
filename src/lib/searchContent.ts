import { supabase } from './supabase/supabaseClient';

export async function searchContent(query: string) {
  if (!query.trim()) return null;

  const pattern = `%${query}%`;
  const [chapters, books, topics, stories] = await Promise.all([
    supabase
      .from('chapters')
      .select('*')
      .or(`name.ilike.${pattern},description.ilike.${pattern}`),

    supabase
      .from('books')
      .select('*')
      .or(
        `title.ilike.${pattern},description.ilike.${pattern},author.ilike.${pattern}`
      ),

    supabase.from('topics').select('*').ilike('title', pattern),

    supabase
      .from('stories')
      .select('*')
      .or(`title.ilike.${pattern},content.ilike.${pattern}`),
  ]);

  const results = {
    chapters: chapters.data || [],
    books: books.data || [],
    topics: topics.data || [],
    stories: stories.data || [],
  };
  if (Object.values(results).every((item) => item.length === 0)) return null;

  return results;
}
