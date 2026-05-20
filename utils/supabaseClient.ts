import { createClient } from '@supabase/supabase-js';

// Supabase public URL and anon key are stored in environment variables (NEXT_PUBLIC_*)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
