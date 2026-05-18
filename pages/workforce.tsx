import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function Workforce() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'negocio' | 'framework'>('negocio');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.whatsapp) return;
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('qualificacao_customer', JSON.stringify(formData));
    }
    
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'workforce-landing',
          utm_source: new URLSearchParams(window.location.search).get('utm_source') || '',
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || '',
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || '',
        }),
      });
    } catch (err) {
      console.error('Lead save error:', err);
    }
    
    setSubmitted(true);
    
    setTimeout(() => {
      sessionStorage.setItem('qualificacao_customer', JSON.stringify(formData));
      sessionStorage.setItem('qualificacao_answers', JSON.stringify({ produto: 'workforce' }));
      window.location.href = '/resultado-workforce';
    }, 1000);
  };

  return (
    <>
      <Meta 
        title="Workforce de IA — Sistema Britto"
        description="Dezenas de agentes de IA que vendem, atendem, cobram e operam sua empresa 24/7. Ou framework livre pra construir seus próprios agentes. As duas frentes."
        path="/workforce"
      />
      
      <Navbar />
      
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

        {/* ===== MODAL ===== */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
            <div className="bg-[#111111] rounded-3xl p-8 max-w-md w-full border border-green-500/30 relative">
              {!submitted ? (
                <>
                  <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">×</button>
<div className="text-center mb-6">
<div className="text-4xl mb-3">🚀</div>
<h3 className="text-2xl font-bold text-white mb-2">Solicitar orçamento</h3>
<p className="text-gray-300 text-sm">Preenche aí que a gente te explica como funciona.</p>
</div>
<form onSubmit={handleSubmit} className="space-y-4">
<div>
<label className="text-gray-300 text-sm font-semibold block mb-1">Nome</label>
<input type="text" placeholder="Seu nome" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none" />
</div>
<div>
<label className="text-gray-300 text-sm font-semibold block mb-1">Email *</label>
<input type="email" placeholder="seu@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none" required />
</div>
<div>
<label className="text-gray-300 text-sm font-semibold block mb-1">WhatsApp *</label>
<input type="tel" placeholder="(11) 99999-9999" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none" required />
</div>
<button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black py-4 rounded-full font-bold text-lg transition-all">
SOLICITAR ORÇAMENTO →
</button>
<p className="text-gray-500 text-xs text-center">Sem spam. Promessa.</p>
</form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-white mb-2">Recebido</h3>
                  <p className="text-gray-300 text-sm">Redirecionando...</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== HERO ===== */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-purple-400 text-xs font-bold uppercase tracking-wider">Força de trabalho digital</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Você não precisa de mais ferramentas.<br />
              <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">Você precisa de mais braço.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
              Dezenas de agentes de IA. Cada um com uma função. Operação 24/7 sem você levantar um dedo.
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
              Duas frentes: agentes prontos que já vendem e atendem, ou o framework livre pra construir os seus próprios.
            </p>
<button onClick={() => setShowModal(true)} className="inline-flex items-center gap-3 bg-purple-500 hover:bg-purple-600 text-white px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-purple-500/25">
SOLICITAR ORÇAMENTO →
</button>
</div>
</section>

        {/* ===== DUAS FRENTES ===== */}
        <section className="py-16 px-4 bg-[#111111]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Duas formas de ter sua workforce de IA</h2>
            
            <div className="flex border-b border-white/20 mb-8">
              <button
                onClick={() => setActiveTab('negocio')}
                className={`px-6 py-3 text-sm font-bold transition-all ${activeTab === 'negocio' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
              >
                AGENTES PRONTOS PRA NEGÓCIO
              </button>
              <button
                onClick={() => setActiveTab('framework')}
                className={`px-6 py-3 text-sm font-bold transition-all ${activeTab === 'framework' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
              >
                FRAMEWORK LIVRE (HERMES)
              </button>
            </div>

            {activeTab === 'negocio' && (
              <div className="space-y-6">
                <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-purple-500/20">
                  <h3 className="text-2xl font-bold text-white mb-4">EvoNexus — Dezenas de Agentes</h3>
                  <p className="text-gray-300 mb-4">
                    Uma orquestração de dezenas de agentes de IA especializados, cada um treinado pra uma função: vendas, agendamento, cobrança, marketing, suporte, análise de dados.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#111111] rounded-xl p-4 border border-purple-500/20">
                      <span className="text-purple-400 font-bold block mb-1">🤖 Agentes Especialistas</span>
                      <p className="text-gray-400 text-sm">SDR, fechador, cobrador, suporte, analista, marketing. Cada um com função e tom de voz diferente.</p>
                    </div>
                    <div className="bg-[#111111] rounded-xl p-4 border border-purple-500/20">
                      <span className="text-purple-400 font-bold block mb-1">🔄 Fluxo Contínuo</span>
                      <p className="text-gray-400 text-sm">Lead entra no WhatsApp, agente qualifica, transfere pro fechador, notifica equipe. Tudo automático.</p>
                    </div>
                    <div className="bg-[#111111] rounded-xl p-4 border border-purple-500/20">
                      <span className="text-purple-400 font-bold block mb-1">📊 Relatórios Semanais</span>
                      <p className="text-gray-400 text-sm">Leads qualificados, consultas agendadas, valores cobrados — toda segunda-feira de manhã.</p>
                    </div>
                    <div className="bg-[#111111] rounded-xl p-4 border border-purple-500/20">
                      <span className="text-purple-400 font-bold block mb-1">🔗 EvoluNexus API</span>
                      <p className="text-gray-400 text-sm">Integração com WhatsApp (Evolution API), CRM, Ghost CMS, Vercel, Supabase. Plug and play.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-purple-500/20">
                  <h3 className="text-xl font-bold text-white mb-4">Resultados reais (em off)</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">📈</span>
                      <div>
                        <p className="text-gray-300 text-sm">Clínica de dentistas: 3x mais consultas agendadas. Agente SDR qualifica, agenda e reconfirma sozinho.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">📈</span>
                      <div>
                        <p className="text-gray-300 text-sm">Studio de Pilates: 20 horas/semana economizadas. IA faz atendimento 24/7.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">📈</span>
                      <div>
                        <p className="text-gray-300 text-sm">Delivery: 3x mais pedidos com mesma equipe. Cardápio automático no WhatsApp.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'framework' && (
              <div className="space-y-6">
                <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-green-500/20">
                  <h3 className="text-2xl font-bold text-white mb-4">Hermes Agent — Framework Livre</h3>
                  <p className="text-gray-300 mb-4">
                    Um framework open-source pra criar, orquestrar e gerenciar agentes de IA. Sem lock-in de provedor: roda com NVIDIA, OpenAI, Anthropic, Google, qualquer API compatível.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#111111] rounded-xl p-4 border border-green-500/20">
                      <span className="text-green-400 font-bold block mb-1">🔧 Multi-Provider</span>
                      <p className="text-gray-400 text-sm">Usa NVIDIA (qwen/qwen3.5), OpenRouter, Anthropic. Troca de modelo sem mudar código.</p>
                    </div>
                    <div className="bg-[#111111] rounded-xl p-4 border border-green-500/20">
                      <span className="text-green-400 font-bold block mb-1">🧠 Kanban Nativo</span>
                      <p className="text-gray-400 text-sm">Sistema de tarefas persistente em SQLite. Agentes trabalham em fila, cada um com sua função.</p>
                    </div>
                    <div className="bg-[#111111] rounded-xl p-4 border border-green-500/20">
                      <span className="text-green-400 font-bold block mb-1">🛠️ 150+ Ferramentas</span>
                      <p className="text-gray-400 text-sm">Terminal, arquivos, browser, GitHub, redes sociais, MCP servers. Agente faz tudo que você faria.</p>
                    </div>
                    <div className="bg-[#111111] rounded-xl p-4 border border-green-500/20">
                      <span className="text-green-400 font-bold block mb-1">🎤 Voz & Multimodal</span>
                      <p className="text-gray-400 text-sm">Lê imagem, ouve áudio, escreve código, responde no WhatsApp. Tudo no mesmo agente.</p>
                    </div>
                    <div className="bg-[#111111] rounded-xl p-4 border border-green-500/20">
                      <span className="text-green-400 font-bold block mb-1">🤖 Autônomo</span>
                      <p className="text-gray-400 text-sm">Cron jobs, webhooks, background tasks. Agente trabalha enquanto você dorme.</p>
                    </div>
                    <div className="bg-[#111111] rounded-xl p-4 border border-green-500/20">
                      <span className="text-green-400 font-bold block mb-1">🔌 MCP Integrado</span>
                      <p className="text-gray-400 text-sm">Conecta com qualquer MCP server. Expande as capacidades sem precisar de plugin novo.</p>
                    </div>
                  </div>
                  <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/30 mb-4">
                    <p className="text-gray-300 text-sm">
                      <strong className="text-green-400">Stack real:</strong> Docker Swarm (5 bots + dashboard), modelo qwen/qwen3.5-122b via NVIDIA API, Evolution API (WhatsApp), Ghost CMS (blog), Kanban em SQLite, deploy em VPS própria (swissnode).
                    </p>
                  </div>
                  <a 
                    href="/hermes"
                    className="inline-block text-sm text-green-400 hover:text-green-300 font-semibold underline"
                  >
                    Saiba mais sobre o Hermes →
                  </a>
                </div>

                <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-green-500/20">
                  <h3 className="text-xl font-bold text-white mb-4">Usos reais do Hermes</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">📝</span>
                      <div>
                        <p className="text-gray-300 text-sm">Reescreveu o site inteiro (sistemabritto.com.br) em 1 dia — Next.js, Tailwind, deploy Vercel, 99% de performance.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">🤖</span>
                      <div>
                        <p className="text-gray-300 text-sm">Gera posts no blog Ghost CMS, revisa copy, otimiza SEO. Sem intervenção humana.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">🔄</span>
                      <div>
                        <p className="text-gray-300 text-sm">Automação de backup VPS, deploy contínuo, monitoramento de infraestrutura. Cron jobs que rodam 24/7.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">📊</span>
                      <div>
                        <p className="text-gray-300 text-sm">Análise de dados, relatórios semanais, integração com Evolution API (WhatsApp). Tudo no mesmo agente.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ===== AGENTES ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Quem trabalha pra você:</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: '💬', title: 'SDR de IA', desc: 'Qualifica lead, agenda, follow-up. Nunca dorme.' },
                { icon: '🛒', title: 'Fechador de IA', desc: 'Tira dúvida, quebra objeção, manda link de pagamento.' },
                { icon: '💰', title: 'Cobrador de IA', desc: 'Cobra, renegocia, recupera inadimplente. Sem constrangimento.' },
                { icon: '🔧', title: 'Suporte de IA', desc: 'Tira dúvida, resolve problema simples, escala pro humano quando necessário.' },
                { icon: '📊', title: 'Analista de IA', desc: 'Gera relatório, dashboard, insight. Você sabe o que tá acontecendo.' },
                { icon: '📢', title: 'Marketing de IA', desc: 'Cria conteúdo, dispara campanha, otimiza anúncio. Escala sem aumentar equipe.' },
              ].map((s, i) => (
                <div key={i} className="bg-[#111111] rounded-2xl p-6 border border-purple-500/20">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-gray-300 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TECNOLOGIA ===== */}
        <section className="py-16 px-4 bg-[#111111]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Stack de tecnologia</h2>
            <p className="text-gray-400 mb-8">Tudo que roda por trás dos agentes:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Docker Swarm', 'NVIDIA API', 'Hermes Agent', 'Evolution API', 'Ghost CMS', 'Supabase', 'Vercel', 'SQLite', 'Next.js', 'Python'].map((tech, i) => (
                <span key={i} className="bg-[#0a0a0a] border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Chega de fazer tudo manual.</h2>
            <p className="text-gray-300 text-lg mb-8">Dezenas de agentes de IA. Ou o framework pra construir os seus. Você escolhe.</p>
            <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-3 bg-purple-500 hover:bg-purple-600 text-white px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-purple-500/25">
              SOLICITAR ORÇAMENTO →
            </button>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}