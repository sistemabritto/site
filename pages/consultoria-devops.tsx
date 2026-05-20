import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';

export default function ConsultoriaDevOps() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Verificar se o usuário está logado
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login?next=/consultoria-devops');
      } else {
        setUser(session.user);
      }
    };

    checkAuth();
  }, [router]);

  // Se o usuário não estiver logado, redireciona para a página de login
  // Se estiver logado, renderiza a página normalmente
  return (
    <div>
      {/* Conteúdo da página de consultoria */}
    </div>
  );
}