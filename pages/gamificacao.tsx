import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Gamificacao from '../components/Gamificacao';

export default function GamificacaoPage() {
  const router = useRouter();

  // Verificar se o usuário está logado
  useEffect(() => {
    const checkAuth = async () => {
      // Substitua esta verificação pela sua lógica de autenticação
      const usuarioLogado = localStorage.getItem('usuarioLogado');
      if (!usuarioLogado) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div>
      <Gamificacao />
    </div>
  );
}