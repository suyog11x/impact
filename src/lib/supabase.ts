import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Check your .env file.');
}

let cleanUrl = (supabaseUrl || '').trim();
if (!cleanUrl.startsWith('http')) {
  cleanUrl = 'http://placeholder-url.com';
}
const cleanKey = (supabaseAnonKey || 'placeholder-key').trim();

export const supabase = createClient(
  cleanUrl, 
  cleanKey
);
