// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ovexmcodlyhefuhmdfez.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92ZXhtY29kbHloZWZ1aG1kZmV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3OTYzOTYsImV4cCI6MjA2NjM3MjM5Nn0.VBMr-0bBxkzoNOqHu6wt4wHkwKx9vrM5lnS7XdliTfg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
