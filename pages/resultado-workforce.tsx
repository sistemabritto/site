import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PHONE = '5511914088571';
const AGENTS = [
  { icon: '🤝', name: 'SDR de Vendas', desc: 'Qualifica leads 24/7 no WhatsApp, agende reuniões e envia propostas.' },
  { icon: '📆', name: 'Agendador Inteligente', desc: 'Gerencia agenda, confirma compromissos e reativa clientes ausentes.' },
  { icon: '💰', name: 'Cobrador Automático', desc: 'Cobra inadimplentes com tom profissional e negocia condições de pagamento.' },
  { icon: '📊', name: 'Analista de Métricas', desc: 'Gera relatórios de desempenho, identifica gargalos e sugere melhorias.' },
  { icon: '🎯', name: 'Fechador de Vendas', desc: 'Aborda leads quentes, responde objeções e finaliza vendas.' },
  { icon: '🛠️', name: 'Suporte Técnico', desc: 'Resolve dúvidas operacionais e encaminha problemas complexos ao time humano.' },
];

const CASES = [
  { antes: 'Clínica OdontoLife', antesDesc: '400 leads/mês perdidos, 3 pessoas no WhatsApp, 20h/semana em agendamento', depois: '3x mais consultas agendadas, IA qualifica e agenda sozinha, equipe foca em procedimentos' },
  { antes: 'Studio Pilates', antesDesc: '3h/dia marcando aula, 40% de faltas, sem follow-up de leads', depois: 'Agendamento 24/7, 20h/semana economizadas, reativação automática de leads dormentes' },
  { antes: 'Delivery Pizzaria', antesDesc: 'Atendente só pro WhatsApp, pedidos iam pro papel, cliente reclamava demora', depois: '3x mais pedidos, mesmo time, pedidos via WhatsApp com cardápio automático' },
];

const FAQ = [
  { q: 'O que é uma workforce de IA?', r: 'É um time completo de agentes de inteligência artificial que trabalham 24 horas por dia, 7 dias por semana, cada um especializado em uma função — vendas, atendimento, cobrança, suporte.' },
  { q: 'Quanto tempo leva pra implementar?', r: 'Em até 48h sua workforce já está operando. A implementação é remota, feita pelo nosso time técnico.' },
  { q: 'Precisa de contrato de fidelidade?', r: 'Não. Você contrata mês a mês e pode cancelar quando quiser, sem multa.' },
  { q: 'E se a IA errar?', r: 'Toda interação tem fallback humano. Se a IA não souber responder, o lead é encaminhado pro seu time automaticamente.' },
  { q: 'Funciona com meu CRM atual?', r: 'Sim. Integramos com Pipedrive, Sticky, RD Station, Salesforce e outros CRMs via Evolution API.' },
  { q: 'Posso testar antes de comprar?', r: 'Sim. São 7 dias de garantia incondicional. Se não gostar, devolvemos 100%.' },
];

export default function ResultadoWorkforce() {
  const [customerData, setCustomerData] = useState({ name: '', email: '', whatsapp: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('qualificacao_customer');
      if (stored) {
        try {
          setCustomerData(JSON.parse(stored));
        } catch {}
      }
    }
    setLoading(false);
  }, []);

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
`Fala, Felipe. Fiz o teste e me recomendaram a Workforce de IA. Tô precisando de braço digital — bora conversar?

Nome: ${customerData.name}
Email: ${customerData.email}
WhatsApp: ${customerData.whatsapp}`
    );
    window.location.href = `https://wa.me/${PHONE}?text=${msg}`;
  };

  if (loading) return null;

  return (
    <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>
      <Meta 
        title="Workforce de IA — Resultado da sua qualificação"
        description="Sua força de trabalho digital com dezenas de agentes de IA. Vendas, atendimento, cobrança, suporte — 24/7."
        path="/resultado-workforce"
      />
      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-4">🤖</div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Seu perfil é <span className="text-green-400">Workforce de IA</span>
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Você não precisa de mais ferramentas. Você precisa de mais braço.
          </p>
          <p className="text-gray-400 mb-8">
            Dezenas de agentes de IA. Cada um com uma função. Trabalhando 24/7. Sem você levantar um dedo.
          </p>
          <button
            onClick={handleWhatsApp}
            className="bg-primary-500 hover:bg-primary-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all shadow-lg shadow-primary-500/25"
          >
            FALAR COM FELIPE →
          </button>
          <p className="text-gray-500 text-sm mt-3">Resposta em até 24h. Sem compromisso.</p>
        </div>
      </section>

      {/* AGENTES */}
      <section className="py-16 px-4 bg-[#111111]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Quem trabalha pra você:</h2>
          <p className="text-gray-400 text-center mb-12">Uma workforce completa com agentes especializados.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AGENTS.map((a, i) => (
              <div key={i} className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/10 hover:border-green-500/30 transition-all">
                <div className="text-3xl mb-3">{a.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{a.name}</h3>
                <p className="text-gray-400 text-sm">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Quem já usa:</h2>
          <div className="space-y-6">
            {CASES.map((c, i) => (
              <div key={i} className="bg-[#111111] rounded-2xl p-6 border border-green-500/20">
                <h3 className="text-xl font-bold text-white mb-2">{c.antes}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                    <p className="text-red-400 text-sm font-semibold mb-1">Antes</p>
                    <p className="text-gray-300 text-sm">{c.antesDesc}</p>
                  </div>
                  <div className="bg-primary-500/10 rounded-xl p-4 border border-green-500/20">
                    <p className="text-green-400 text-sm font-semibold mb-1">Depois</p>
                    <p className="text-gray-300 text-sm">{c.depois}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-[#111111]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Dúvidas comuns</h2>
          <div className="space-y-4">
            {FAQ.map((f, i) => (
              <details key={i} className="bg-[#0a0a0a] rounded-xl p-4 border border-white/10">
                <summary className="text-white font-semibold cursor-pointer">{f.q}</summary>
                <p className="text-gray-300 mt-3 text-sm">{f.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Pronto pra ter sua workforce de IA?</h2>
        <p className="text-gray-400 mb-8">Fala com Felipe agora e descobre como funciona.</p>
        <button
          onClick={handleWhatsApp}
          className="bg-primary-500 hover:bg-primary-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all shadow-lg shadow-primary-500/25"
        >
          FALAR COM FELIPE →
        </button>
      </section>

      <Footer />
    </main>
  );
}