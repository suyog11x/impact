import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://deoqpvipyvrjdomgmxwy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsI' + 'nJlZiI6ImRlb3FwdmlweXZyamRvbWdteHd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NTQ1MzYsImV4cCI6MjA5NDQzMDUzNn0.2ihelJlu0nl8mMFt4HwWqYeMUUJLUneZfd0lgzy5a7w';

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
