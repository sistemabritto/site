import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ConsultoriaDevOps() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/login?next=/consultoria-devops');
        } else {
          setUser(session.user);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        router.push('/login?next=/consultoria-devops');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <>
      <Meta
        title="Consultoria DevOps — Sistema Britto"
        description="Consultoria especializada em DevOps, infraestrutura e automação para empresas que precisam de escala."
        path="/consultoria-devops"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#0a0a0a] text-white pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-1 text-[#D4AF37] text-sm font-medium mb-6">
            Consultoria DevOps
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Sua infraestrutura não escala.
            <br />
            <span className="text-[#D4AF37]">A gente resolve.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Docker Swarm, CI/CD, monitoramento, automação. Consultoria técnica para empresas que precisam parar de apagar fogo e começar a escalar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5571999841612?text=Olá! Quero saber mais sobre a consultoria DevOps."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#1ebe57] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.965-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.134.298-.347.446-.52.149-.174.198-.298.298-.496.099-.198.05-.373-.025-.52-.075-.149-.669-1.612-.917-2.21-.24-.58-.48-.5-.669-.51l-.57-.01c-.198 0-.52.074-.793.372-.273.298-1.044 1.025-1.044 2.494 0 1.468 1.069 2.886 1.214 3.082.149.197 2.104 3.21 5.097 4.512.709.305 1.26.488 1.69.624.712.226 1.348.195 1.854.12.567-.08 1.755-.718 2.002-1.41.248-.692.248-1.284.173-1.41-.075-.124-.272-.198-.57-.347m-4.945 5.836c-3.3 0-6.002-2.703-6.002-6.002 0-3.299 2.702-6.001 6.002-6.001 3.299 0 6.001 2.702 6.001 6.001 0 3.299-2.702 6.002-6.001 6.002zm0-13.503c-4.132 0-7.501 3.369-7.501 7.501s3.369 7.501 7.501 7.501 7.501-3.369 7.501-7.501-3.369-7.501-7.501-7.501z"/>
              </svg>
              Falar com Especialista
            </a>
            <a
              href="#servicos"
              className="border border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-medium hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-200"
            >
              Ver Serviços
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="bg-[#0f0f0f] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">O que a gente faz</h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Consultoria técnica hands-on. A gente não entrega PowerPoint — entrega infraestrutura funcionando.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🐳',
                title: 'Docker Swarm & Orquestração',
                desc: 'Cluster Docker Swarm production-ready. Auto-scaling, rolling updates, service discovery.',
              },
              {
                icon: '🔄',
                title: 'CI/CD & Automação',
                desc: 'Pipelines de deploy automatizado. GitLab CI, GitHub Actions, webhooks. Zero downtime deploys.',
              },
              {
                icon: '📊',
                title: 'Monitoramento & Alertas',
                desc: 'Prometheus, Grafana, alertas em tempo real. Você sabe antes do cliente que algo quebrou.',
              },
              {
                icon: '🔒',
                title: 'Segurança & Hardening',
                desc: 'WAF, rate limiting, secrets management, SSL automático. Infra segura por padrão.',
              },
              {
                icon: '☁️',
                title: 'Cloud & Migração',
                desc: 'Migração de on-premise para cloud. AWS, GCP, VPS otimizada. Custo justo, performance real.',
              },
              {
                icon: '🤖',
                title: 'Automação com IA',
                desc: 'Agentes de IA para monitoramento, auto-healing, alertas inteligentes. Infra que se conserta sozinha.',
              },
            ].map((service, i) => (
              <div
                key={i}
                className="bg-[#111111] border border-gray-800 rounded-xl p-6 hover:border-[#D4AF37]/30 transition-all duration-200 hover:-translate-y-1"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0a0a0a] text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto pra parar de apagar fogo?</h2>
          <p className="text-gray-400 text-lg mb-8">
            Conversa de 30 minutos. Sem compromisso. A gente mostra exatamente onde sua infra pode melhorar.
          </p>
          <a
            href="https://wa.me/5571999841612?text=Olá! Quero agendar uma consultoria DevOps."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#D4AF37] text-black px-8 py-4 rounded-lg font-bold hover:bg-[#c9a030] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            Agendar Conversa
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
