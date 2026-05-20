import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../utils/supabaseClient';

export async function getServerSideProps() {
  return { props: {} };
}

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Supabase Auth gerencia o callback automaticamente
    // O session é recuperado via cookie/localStorage
    // Após login bem-sucedido, redireciona para a página desejada
    
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Usuário logado com sucesso
        // Redireciona para a página que ele estava tentando acessar ou home
        const next = (router.query.next as string) || (router.query.redirect as string) || '/';
        router.replace(next);
      } else {
        // Se não tem sessão, redireciona para login
        router.replace('/login');
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
