import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

const agents = [
  { name: 'Clawdia', domain: 'Operações', desc: 'Agenda, e-mails, tarefas, decisões' },
  { name: 'Flux', domain: 'Finanças', desc: 'Stripe, ERP, fluxo de caixa, relatórios' },
  { name: 'Atlas', domain: 'Projetos', desc: 'Linear, GitHub, sprints, métricas' },
  { name: 'Nex', domain: 'Vendas', desc: 'Pipeline, propostas, qualificação' },
  { name: 'Mako', domain: 'Marketing', desc: 'Campanhas, SEO, marca, conteúdo' },
  { name: 'Aria', domain: 'RH / Pessoas', desc: 'Recrutamento, onboarding, desempenho' },
  { name: 'Lex', domain: 'Jurídico', desc: 'Contratos, compliance, NDA, risco' },
  { name: 'Dex', domain: 'Dados / BI', desc: 'Análise, SQL, dashboards' },
];

const cases = [
  { name: 'Clínica OdontoLife', result: '3x mais consultas', desc: 'De 400 leads/mês para 1.200. IA qualifica, agenda e reconfirma.' },
  { name: 'Studio Pilates', result: '20h/semana economizadas', desc: 'Antes 3h/dia no WhatsApp. Hoje a IA faz tudo sozinha.' },
  { name: 'Delivery Pizzaria', result: '3x mais pedidos', desc: 'Do pedido ao delivery, tudo automático. Mesma equipe.' },
];

export default function Workforce() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (productId: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/abacatepay/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        window.location.href = `https://wa.me/5511914088571?text=Olá!%20Quero%20o%20plano%20${productId}`;
      }
    } catch {
      window.location.href = `https://wa.me/5511914088571?text=Olá!%20Quero%20o%20plano%20${productId}`;
    }
  };

  return (
    <>
      <Meta 
        title="Workforce de IA — Sistema Britto"
        description="Sua empresa vai ter uma força de trabalho de IA em 48 horas. Atendimento, vendas, finanças, projetos, marketing — tudo automatizado."
        path="/workforce"
      />
      
      <Navbar />
      
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

        {/* ===== HERO — COPY AGRESSIVA ===== */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Vagas Limitadas</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Seu concorrente já usa<br />
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">IA pra operar 24/7.</span><br />
              Você ainda faz tudo manual.
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
              Enquanto você dorme, 47 leads mandaram mensagem. Amanhã, 30 vão pro concorrente.
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto">
              Não é falta de esforço. É falta de escala. A gente resolve isso em 48 horas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#planos" className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-green-500/25">
                VER PLANOS →
              </a>
              <a href="/qualificacao" className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 hover:bg-white/20 border border-white/20">
                Fazer qualificação gratuita
              </a>
            </div>
          </div>
        </section>

        {/* ===== CARTA DE VENDAS — DOR ===== */}
        <section className="py-24 px-4 bg-[#111111]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-2xl sm:text-3xl text-gray-200 leading-relaxed mb-6">
                Você tá perdendo dinheiro todo dia. E nem percebe.
              </p>
              <p className="text-xl text-gray-400">
                Leads ignorados. Follow-ups esquecidos. Relatórios que ninguém lê. 
                Enquanto isso, seu concorrente automatizou tudo.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { emoji: '💸', text: 'Leads quentes esfriam porque você demora pra responder' },
                { emoji: '📉', text: 'Follow-up? Que follow-up? Você esquece metade dos clientes' },
                { emoji: '🔥', text: 'Seu time passa 60% do tempo em tarefa repetitiva' },
                { emoji: '📊', text: 'Você não sabe quanto faturou esse mês sem planilha' },
                { emoji: '😤', text: 'Contrata mais gente, o problema continua. Porque o problema não é gente.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-black/80 p-6 rounded-xl border border-red-500/20">
                  <span className="text-3xl">{item.emoji}</span>
                  <p className="text-gray-200 text-lg">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-16 py-12 border-y border-white/10">
              <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed">
                O problema não é você. É o modelo. <span className="text-green-400 font-bold">Empresas que automatizam operam com 1/3 do time e faturam 3x mais.</span>
              </p>
            </div>
          </div>
        </section>

        {/* ===== SOLUÇÃO — O QUE É ===== */}
        <section className="py-24 px-4 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-green-400 text-xs font-bold uppercase tracking-widest mb-4 border border-green-500/30 px-4 py-2 rounded-full bg-green-500/10">
                A solução
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Uma workforce completa de IA.<br />
                <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">Pronta pra operar em 48 horas.</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Não é um chatbot. É uma equipe de agentes inteligentes que atendem, vendem, 
                gerenciam finanças, coordenam projetos e analisam dados — 24 horas por dia, 7 dias por semana.
              </p>
            </div>

            {/* O que inclui */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-[#111111] rounded-2xl p-8 border border-green-500/20">
                <h3 className="text-2xl font-bold text-white mb-6">💬 Atendimento + Vendas</h3>
                <ul className="space-y-3">
                  {[
                    'WhatsApp com IA que responde em <1 segundo',
                    'Qualificação automática de leads',
                    'Agendamento inteligente de consultas',
                    'Follow-up automático que não esquece ninguém',
                    'CRM integrado com funil comercial',
                    'Reativação de leads dormentes',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-200">
                      <span className="text-green-400">✓</span><span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#111111] rounded-2xl p-8 border border-green-500/20">
                <h3 className="text-2xl font-bold text-white mb-6">🏭 Operações + Gestão</h3>
                <ul className="space-y-3">
                  {[
                    'Agente financeiro: fluxo de caixa, DRE, alertas',
                    'Agente de projetos: tarefas, prazos, entregas',
                    'Agente de marketing: conteúdo, posts, analytics',
                    'Agente de RH: recrutamento, onboarding',
                    'Agente jurídico: contratos, compliance',
                    'Dashboard web com visão geral do negócio',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-200">
                      <span className="text-green-400">✓</span><span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Agentes */}
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-white mb-4">Seu novo time de IA</h3>
              <p className="text-gray-400">Agentes especializados, cada um com memória persistente e skills do domínio.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {agents.map((agent) => (
                <div key={agent.name} className="bg-[#111111] rounded-xl p-4 border border-green-500/20 text-center">
                  <div className="text-green-400 font-bold text-lg mb-1">{agent.name}</div>
                  <div className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-semibold inline-block mb-2">{agent.domain}</div>
                  <p className="text-gray-300 text-sm">{agent.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== COMO FUNCIONA ===== */}
        <section className="py-24 px-4 bg-[#111111]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Como funciona</h2>
            
            <div className="space-y-8">
              {[
                { step: '01', title: 'Diagnóstico', desc: 'Você faz a qualificação gratuita. Em 2 minutos, sabemos exatamente o que sua empresa precisa.' },
                { step: '02', title: 'Implementação', desc: 'Em 48 horas, sua workforce tá no ar. WhatsApp, CRM, agentes — tudo configurado e rodando.' },
                { step: '03', title: 'Operação', desc: 'Seu time foca no estratégico. A IA cuida do operacional. Relatórios automáticos, decisões em tempo real.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 bg-black/80 p-6 rounded-xl border border-white/10">
                  <div className="text-4xl font-bold text-green-400">{item.step}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CASES ===== */}
        <section className="py-24 px-4 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Resultados reais</h2>
            <p className="text-gray-400 text-center mb-12 text-lg">Empresas que já usam nossa workforce.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cases.map((c, i) => (
                <div key={i} className="bg-[#111111] rounded-2xl p-6 border border-green-500/20 text-center">
                  <div className="text-green-400 text-2xl font-bold mb-2">{c.result}</div>
                  <h3 className="text-white font-bold mb-2">{c.name}</h3>
                  <p className="text-gray-300 text-sm">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PLANOS — COM GOLD ===== */}
        <section id="planos" className="py-24 px-4 bg-[#111111]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">Escolha seu plano</h2>
            <p className="text-gray-400 text-center mb-12 text-lg">Do WhatsApp automatizado à empresa completa em IA.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Essencial */}
              <div className="bg-[#111111] rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-2">Essencial</h3>
                <p className="text-gray-400 text-sm mb-6">WhatsApp + IA pra quem quer começar</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-white text-sm">R$</span>
                  <span className="text-5xl font-bold text-white">297</span>
                  <span className="text-gray-400 text-sm">/mês</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {['Atendente de IA 24/7 no WhatsApp', 'Qualificação automática de leads', 'Agendamento inteligente', 'CRM básico com funil', 'Follow-up automático', 'Suporte via WhatsApp'].map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-green-400">✓</span><span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleCheckout('whatsapp-ia-basico')}
                  disabled={loading}
                  className="block w-full text-center bg-white text-black py-4 rounded-full font-bold hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  Começar Agora
                </button>
              </div>

              {/* Completo */}
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A028]/10 rounded-3xl p-8 border border-[#D4AF37]/50 relative">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black px-4 py-1 rounded-full text-xs font-bold uppercase">Mais Popular</span>
                <h3 className="text-2xl font-bold text-white mb-2">Completo</h3>
                <p className="text-gray-400 text-sm mb-6">CRM + IA avançada pra escalar vendas</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-white text-sm">R$</span>
                  <span className="text-5xl font-bold text-white">750</span>
                  <span className="text-gray-400 text-sm">/mês</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {['Tudo do Essencial', 'CRM completo com funil avançado', 'Reativação de leads dormentes', 'Multi-atendentes com IA assistida', 'Integração Pipedrive/Sticky', 'Relatórios de ROI'].map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-[#D4AF37]">✓</span><span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleCheckout('crm-ia-completo')}
                  disabled={loading}
                  className="block w-full text-center bg-[#D4AF37] text-black py-4 rounded-full font-bold hover:bg-[#C5A028] transition-colors disabled:opacity-50"
                >
                  Começar Agora
                </button>
              </div>

              {/* Premium */}
              <div className="bg-[#111111] rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
                <p className="text-gray-400 text-sm mb-6">Empresa completa em IA — workforce total</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-white text-sm">R$</span>
                  <span className="text-5xl font-bold text-white">2.500</span>
                  <span className="text-gray-400 text-sm">/mês</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {['Tudo do Completo', '8+ agentes especializados', 'Finanças, Projetos, Marketing, Jurídico', 'Engineering agents', 'Dashboard web completo', 'Onboarding dedicado', 'Suporte prioritário 24h'].map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-green-400">✓</span><span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleCheckout('evonexus-premium')}
                  disabled={loading}
                  className="block w-full text-center bg-white text-black py-4 rounded-full font-bold hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  Falar com Especialista
                </button>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-400 text-sm mb-4">Não sabe qual plano escolher?</p>
              <a href="/qualificacao" className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:bg-white/20 border border-white/20">
                Fazer qualificação gratuita →
              </a>
            </div>
          </div>
        </section>

        {/* ===== GARANTIA ===== */}
        <section className="py-16 px-4 bg-[#0a0a0a]">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-5xl mb-4">🛡️</div>
            <h2 className="text-2xl font-bold text-white mb-4">7 dias de garantia incondicional</h2>
            <p className="text-gray-300 text-lg">Se em 7 dias você não ver resultado, devolvemos cada centavo. Sem perguntas. Sem burocracia.</p>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Perguntas Frequentes</h2>
            <div className="space-y-6">
              {[
                { q: 'Preciso saber programar?', a: 'Não. A gente configura tudo pra você em 48 horas.' },
                { q: 'Meus clientes vão saber que é IA?', a: 'Só se você quiser. A IA pode se apresentar como assistente, atendente virtual ou com o nome da sua empresa.' },
                { q: 'E se eu quiser cancelar?', a: 'Pode cancelar quando quiser. Sem multa. Sem fidelidade.' },
                { q: 'Funciona pro meu tipo de negócio?', a: 'Se você tem WhatsApp, funciona. Clínica, escritório, loja, SaaS, delivery — todos os segmentos.' },
                { q: 'Quanto tempo leva pra implementar?', a: '48 horas. Você aprova, a gente configura, e começa a usar.' },
              ].map((item, i) => (
                <div key={i} className="bg-black/80 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-2">{item.q}</h3>
                  <p className="text-gray-300">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="py-24 px-4 bg-[#0a0a0a]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Cada dia sem automação<br />
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">é dinheiro indo embora.</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Para de perder tempo. Ativa sua workforce de IA agora.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#planos" className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-green-500/25">
                VER PLANOS →
              </a>
              <a href="/qualificacao" className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-5 rounded-full font-semibold text-lg transition-all duration-200 hover:bg-white/20 border border-white/20">
                Fazer qualificação gratuita
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
