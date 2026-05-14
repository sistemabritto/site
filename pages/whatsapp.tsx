import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

const features = [
  { icon: '🎯', title: 'Qualificação automática de leads', desc: 'IA que faz perguntas-chave, classifica por interesse e envia pro CRM já segmentado.' },
  { icon: '📅', title: 'Agendamento 24/7', desc: 'Seu cliente marca, remarca e cancela sozinho. Sem erro humano, sem retrabalho.' },
  { icon: '🔄', title: 'Reativação de leads dormentes', desc: 'Recupera leads parados há semanas com mensagens personalizadas e ofertas certas.' },
  { icon: '📊', title: 'CRM integrado nativamente', desc: 'Pipedrive, Sticky, RD Station — tudo sincronizado em tempo real, sem digitação.' },
  { icon: '👥', title: 'Multi-atendentes com IA assistida', desc: 'Seu time humano assume quando precisa, com histórico completo e sugestões de resposta.' },
  { icon: '⚡', title: 'Resposta em <1 segundo', desc: 'Lead não espera. Seu WhatsApp responde na hora, a qualquer horário.' },
];

const cases = [
  { name: 'Clínica OdontoLife', result: '3x mais consultas agendadas', desc: 'De 400 leads/mês para 1.200. IA qualifica, agenda e reconfirma automaticamente.' },
  { name: 'Studio Pilates', result: '20h/semana economizadas', desc: 'Antes 3h/dia no WhatsApp marcando e remarcando. Hoje a IA faz tudo sozinha.' },
  { name: 'Delivery Pizzaria', result: '3x mais pedidos, mesma equipe', desc: 'Do pedido ao delivery, tudo automático. Cliente elogia a velocidade.' },
];

const faqs = [
  { q: 'Preciso de chip novo?', a: 'Não. Funciona no seu número atual. Você pode usar um número específico ou fazer o desvio do seu principal.' },
  { q: 'Demora pra configurar?', a: 'O setup leva 24-48h. A gente configura tudo. É só aprovar e começar a usar.' },
  { q: 'Posso cancelar?', a: 'Pode cancelar quando quiser. Sem multa. Sem fidelidade. Sem letra miúda.' },
  { q: 'Funciona no meu negócio?', a: 'Se você usa WhatsApp pra atender cliente, funciona. Clínica, escritório, loja, delivery, serviços — todos os segmentos.' },
  { q: 'Meus clientes vão saber que é IA?', a: 'Só se você quiser. A IA pode se apresentar como assistente, atendente virtual ou com o nome da sua empresa.' },
];

export default function WhatsApp() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orderBump, setOrderBump] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitLead = async () => {
    if (!formData.email || !formData.whatsapp) return;
    
    // Salvar lead no CRM (API local)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'whatsapp-landing',
          utm_source: new URLSearchParams(window.location.search).get('utm_source') || '',
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || '',
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || '',
        }),
      });
    } catch (e) {
      console.error('Lead save error:', e);
    }
    
    setSubmitted(true);
    setTimeout(() => {
      handleCheckout();
    }, 800);
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const products = ['whatsapp-ia-basico'];
      if (orderBump) {
        products.push('consultoria-tecnica-whatsapp');
      }
      
      const res = await fetch('/api/abacatepay/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productId: products[0],
          customer: {
            email: formData.email,
            name: formData.name || formData.email.split('@')[0],
            cellphone: formData.whatsapp,
          },
          orderBump: orderBump,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        window.location.href = 'https://wa.me/5511914088571?text=Olá!%20Quero%20o%20WhatsApp%20IA%20de%20R$297';
      }
    } catch {
      window.location.href = 'https://wa.me/5511914088571?text=Olá!%20Quero%20o%20WhatsApp%20IA%20de%20R$297';
    }
  };

  const openCheckout = () => {
    setShowModal(true);
  };

  return (
    <>
      <Meta 
        title="WhatsApp + IA — Sistema Britto"
        description="Seu WhatsApp como central comercial. IA que qualifica, agenda, vende e reativa leads 24/7. R$ 297/mês. Sem fidelidade."
        path="/whatsapp"
      />
      
      <Navbar />
      
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

        {/* ===== MODAL EMAIL + WHATSAPP ===== */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
            <div className="bg-[#111111] rounded-3xl p-8 max-w-md w-full border border-green-500/30 relative">
              {!submitted ? (
                <>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                  >×</button>
                  
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">🚀</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Quase lá!</h3>
                    <p className="text-gray-300 text-sm">Seus dados = checkout mais rápido. Sem repetir tudo.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">Nome</label>
                      <input
                        type="text"
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">Email *</label>
                      <input
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">WhatsApp *</label>
                      <input
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                        className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
                        required
                      />
                    </div>

                    {/* ORDER BUMP */}
                    <div 
                      className="flex items-center gap-3 bg-[#0a0a0a] rounded-xl p-4 border cursor-pointer transition-all"
                      style={{ borderColor: orderBump ? '#D4AF37' : 'rgba(255,255,255,0.1)' }}
                      onClick={() => setOrderBump(!orderBump)}
                    >
                      <div 
                        className="w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0"
                        style={{ borderColor: orderBump ? '#D4AF37' : '#666', backgroundColor: orderBump ? '#D4AF37' : 'transparent' }}
                      >
                        {orderBump && <span className="text-black font-bold text-sm">✓</span>}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-semibold text-sm">+ Consultoria Técnica WhatsApp</span>
                          <span className="text-[#D4AF37] font-bold text-sm">R$ 250</span>
                        </div>
                        <p className="text-gray-400 text-xs mt-1">Suporte técnico humano via WhatsApp com SLA de 24h. Configuração, integrações, troubleshooting.</p>
                      </div>
                    </div>

                    <button
                      onClick={handleSubmitLead}
                      disabled={!formData.email || !formData.whatsapp || loading}
                      className="w-full bg-green-500 hover:bg-green-600 text-black py-4 rounded-full font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Carregando...' : `CONTINUAR — R$ ${orderBump ? '547' : '297'}`}
                    </button>
                    
                    <p className="text-gray-500 text-xs text-center">Seus dados estão seguros. Sem spam.</p>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-white mb-2">Redirecionando pro checkout...</h3>
                  <p className="text-gray-400 text-sm">Seus dados foram salvos. Você será redirecionado em instantes.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== HERO — SEM PREÇO, COPY AGRESSIVA ===== */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Vagas Disponíveis</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Seu concorrente responde<br />
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">em 1 segundo.</span><br />
              Você, em 1 hora.
            </h1>
            
            <p className="text-gray-200 text-lg max-w-2xl mx-auto font-medium mb-4">
              Enquanto você dorme, 47 leads mandaram mensagem no seu WhatsApp. 
              Amanhã, 30 deles vão pro concorrente.
            </p>
            <p className="text-gray-400 text-base max-w-xl mx-auto mb-8">
              Não é falta de esforço. É falta de escala. A IA resolve isso por R$ 297/mês.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={openCheckout}
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25"
              >
                ATIVAR MEU WHATSAPP IA →
              </button>
            </div>

            <p className="text-gray-400 text-sm mt-4">Sem fidelidade. Cancele quando quiser. 7 dias de garantia.</p>
          </div>
        </section>

        {/* ===== STATS ===== */}
        <section className="py-12 bg-[#111111]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black/80 rounded-2xl p-6 text-center border border-green-500/20">
                <div className="text-4xl font-bold text-green-400 mb-2">24/7</div>
                <div className="text-gray-200 text-sm">Atendimento automático</div>
              </div>
              <div className="bg-black/80 rounded-2xl p-6 text-center border border-green-500/20">
                <div className="text-4xl font-bold text-green-400 mb-2">&lt;1s</div>
                <div className="text-gray-200 text-sm">Tempo de resposta</div>
              </div>
              <div className="bg-black/80 rounded-2xl p-6 text-center border border-green-500/20">
                <div className="text-4xl font-bold text-green-400 mb-2">3x</div>
                <div className="text-gray-200 text-sm">Mais conversões</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PRINTS REAIS DO CRM ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-green-400 text-xs font-bold uppercase tracking-widest mb-4 border border-green-500/30 px-4 py-2 rounded-full bg-green-500/10">
                Na prática
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                É assim que seu CRM vai funcionar:
              </h2>
              <p className="text-gray-300 text-lg">Leads qualificados, organizados e prontos pra fechar. Sem trabalho manual.</p>
            </div>

            <div className="mb-8">
              <img 
                src="/images/evo/chat-atendimento.webp" 
                alt="Chat de atendimento - IA qualificando leads no WhatsApp"
                className="w-full max-w-5xl mx-auto rounded-2xl border border-green-500/30 shadow-2xl shadow-green-500/10"
              />
              <p className="text-gray-300 text-sm mt-4 text-center">Atendimento automático com IA que qualifica e classifica leads em tempo real</p>
            </div>

            <div className="mb-8">
              <img 
                src="/images/evo/page-pipeline.webp" 
                alt="Pipeline de vendas - CRM integrado"
                className="w-full max-w-4xl mx-auto rounded-2xl border border-green-500/30 shadow-xl shadow-green-500/10"
              />
              <p className="text-gray-300 text-sm mt-4 text-center">Pipeline automático: leads quentes, mornos e frios organizados por valor</p>
            </div>

            <div>
              <img 
                src="/images/evo/page-channels.webp" 
                alt="Canais de comunicação - Evolution API"
                className="w-full max-w-4xl mx-auto rounded-2xl border border-green-500/30 shadow-xl shadow-green-500/10"
              />
              <p className="text-gray-300 text-sm mt-4 text-center">Multi-canais: WhatsApp, Instagram, Telegram — tudo centralizado</p>
            </div>
          </div>
        </section>

        {/* ===== ANALYTICS DO CRM ===== */}
        <section className="py-16 bg-[#111111]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Métricas que importam</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '94%', label: 'Taxa de resposta automática', icon: '✅' },
                { value: '3.2x', label: 'Mais agendamentos', icon: '📅' },
                { value: '67%', label: 'Redução no tempo de follow-up', icon: '⚡' },
                { value: 'R$ 12k', label: 'Economia média/mês', icon: '💰' },
              ].map((stat, i) => (
                <div key={i} className="bg-black/80 rounded-2xl p-6 text-center border border-green-500/20">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-green-400 mb-1">{stat.value}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== DOR ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Você perde vendas porque:
            </h2>
            <div className="space-y-4">
              {[
                'Demora pra responder no WhatsApp',
                'Esquece de fazer follow-up',
                'Não tem tempo de qualificar cada lead',
                'Perde cliente fora do horário comercial',
                'Não consegue acompanhar tudo manualmente',
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 bg-[#111111] p-5 rounded-xl border border-red-500/20">
                  <span className="text-2xl">❌</span>
                  <p className="text-gray-200 text-lg">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== EVOLUTION API PARTNERSHIP ===== */}
        <section className="py-16 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-black/80 rounded-3xl p-8 border border-green-500/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Embaixador & Contributor</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Parceiro oficial da Evolution API
                  </h2>
                  <p className="text-gray-200 text-sm leading-relaxed mb-6">
                    Somos parceiros oficiais da <strong>Evolution API</strong> — a plataforma open-source 
                    que conecta WhatsApp, automação e IA em um só lugar. Como embaixadores, temos 
                    acesso antecipado a features, suporte prioritário e capacidade de implementar 
                    soluções customizadas.
                  </p>
                  <ul className="space-y-2">
                    {['Implementação oficial Evolution API', 'Suporte direto dos desenvolvedores', 'Features customizadas para seu caso'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-100 text-sm">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <img src="/images/evo/evolution-api-logo.png" alt="Evolution API" className="w-48 h-auto opacity-80" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section className="py-20 sm:py-32 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block text-green-400 text-xs font-bold uppercase tracking-widest mb-4 border border-green-500/30 px-4 py-2 rounded-full bg-green-500/10">
                Funcionalidades
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Tudo que seu WhatsApp<br />
                <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">precisava ter</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <div key={i} className="bg-black/80 rounded-2xl p-6 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CASES ===== */}
        <section className="py-20 sm:py-32 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block text-green-400 text-xs font-bold uppercase tracking-widest mb-4 border border-green-500/30 px-4 py-2 rounded-full bg-green-500/10">
                Cases
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Resultados reais<br />
                <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">em números</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cases.map((c, i) => (
                <div key={i} className="bg-black/80 rounded-2xl p-6 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-green-400 text-3xl font-bold mb-2">{c.result}</div>
                  <h3 className="text-white font-bold mb-2">{c.name}</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== OFERTA R$ 297 — COM GOLD + ORDER BUMP ===== */}
        <section id="plano" className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Oferta de lançamento
            </h2>
            <p className="text-gray-400 mb-8">Preço válido enquanto durarem as vagas.</p>

            <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A028]/10 rounded-3xl p-8 border border-[#D4AF37]/50 mb-8">
              <div className="inline-block bg-[#D4AF37] text-black px-4 py-1 rounded-full text-xs font-bold uppercase mb-6">
                ⚡ R$ 453 de desconto
              </div>
              
              <ul className="space-y-4 text-left mb-8">
                {[
                  'Atendente de IA 24/7 no WhatsApp',
                  'Qualificação automática de leads',
                  'Agendamento inteligente de consultas',
                  'CRM básico com funil comercial',
                  'Follow-up automático',
                  'Relatórios de conversão',
                  'Suporte via WhatsApp',
                  'Setup incluso (sem taxa extra)',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-200">
                    <span className="text-[#D4AF37] text-xl">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-8 border-t border-[#D4AF37]/30">
                <div className="flex items-baseline justify-center gap-2 mb-6">
                  <span className="text-gray-300 text-lg">De</span>
                  <span className="text-gray-400 text-2xl line-through">R$ 750</span>
                  <span className="text-gray-300 text-lg">por</span>
                  <span className="text-white text-6xl font-bold">R$ 297</span>
                  <span className="text-gray-300 text-xl">/mês</span>
                </div>

                {/* ORDER BUMP INLINE */}
                <div 
                  className="flex items-center gap-3 bg-black/60 rounded-xl p-4 mb-6 border cursor-pointer transition-all text-left"
                  style={{ borderColor: orderBump ? '#D4AF37' : 'rgba(255,255,255,0.1)' }}
                  onClick={() => setOrderBump(!orderBump)}
                >
                  <div 
                    className="w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: orderBump ? '#D4AF37' : '#666', backgroundColor: orderBump ? '#D4AF37' : 'transparent' }}
                  >
                    {orderBump && <span className="text-black font-bold text-sm">✓</span>}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold text-sm">+ Consultoria Técnica WhatsApp</span>
                      <span className="text-[#D4AF37] font-bold text-sm">R$ 250</span>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">Suporte técnico humano via WhatsApp com SLA de 24h</p>
                  </div>
                </div>

                <button
                  onClick={openCheckout}
                  className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#C5A028] text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-[#D4AF37]/25 w-full justify-center"
                >
                  ATIVAR MEU WHATSAPP IA →
                </button>

                <p className="text-gray-300 text-sm mt-4">Sem fidelidade. Cancele quando quiser. 7 dias de garantia.</p>
              </div>
            </div>

            <div className="bg-[#111111] rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-4">
                <span className="text-4xl">🛡️</span>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-white">7 dias de garantia incondicional</h3>
                  <p className="text-gray-300 text-sm">Se não gostar, devolvemos cada centavo. Sem perguntas.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="py-20 px-4 bg-black">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Dúvidas Frequentes
            </h2>

            <div className="space-y-6">
              {faqs.map((item, i) => (
                <div key={i} className="bg-[#111111] rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-2">{item.q}</h3>
                  <p className="text-gray-300">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="py-20 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Cada lead que espera<br />
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">é uma venda perdida.</span>
            </h2>
            <p className="text-gray-200 text-lg mb-8">
              Para de perder tempo. Ativa seu WhatsApp IA agora.
            </p>
            <button
              onClick={openCheckout}
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-green-500/25"
            >
              ATIVAR MEU WHATSAPP IA →
            </button>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
