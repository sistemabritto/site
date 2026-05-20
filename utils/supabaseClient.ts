import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Create client - env vars are injected by Next.js at build time for NEXT_PUBLIC_*
// In runtime (browser), these are always available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnzpcilebqqgbqdgwtlw.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);
