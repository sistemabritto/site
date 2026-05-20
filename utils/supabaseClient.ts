import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase environment variables missing! Login will not work.');
  // Optionally throw to fail fast in dev
  // throw new Error('Supabase env vars missing');
}

export const supabase = createClient(supabaseUrl!, supabaseKey!);
