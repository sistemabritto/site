import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Dynamic import helper - only loads Supabase at runtime (browser), never at build time
async function getSupabase() {
  const mod = await import('../../utils/supabaseClient');
  return mod.supabase;
}

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const supabase = await getSupabase();
        
        // Wait a bit for Supabase to process the OAuth callback
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Get the redirect URL from query params or default to home
          const params = new URLSearchParams(window.location.search);
          const next = params.get('next') || params.get('redirect') || '/';
          window.location.href = next;
        } else {
          // No session, redirect to login
          window.location.href = '/login';
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        window.location.href = '/login';
      }
    };

    checkSession();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
        <p className="text-gray-400">Finalizando login...</p>
      </div>
    </div>
  );
}
