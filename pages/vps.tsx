import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PHONE = '5511914088571';

const VPS_PRODUCT_SLUG = 'vps-gerenciada';
const VPS_COMBO_PRODUCT_SLUG = 'vps-gerenciada-combo-suporte';

export default function VPS() {
  const [customerData, setCustomerData] = useState({ name: '', email: '', whatsapp: '' });
  const [orderBump, setOrderBump] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('qualificacao_customer');
      if (stored) {
        try {
          const data = JSON.parse(stored);
          setCustomerData(data);
        } catch {}
      }
    }
  }, []);

  const handleCheckout = async () => {
    setLoading(true);

    const productId = orderBump ? VPS_COMBO_PRODUCT_SLUG : VPS_PRODUCT_SLUG;

    try {
      const res = await fetch('/api/abacatepay/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          customer: customerData.email ? {
            name: customerData.name,
            email: customerData.email,
            cellphone: customerData.whatsapp || customerData.email,
          } : undefined,
          returnUrl: `${window.location.origin}/obrigado`,
        }),
      });

      const data = await res.json();

      if (data.url) {
      window.location.href = data.url;
      } else {
      const NL = '%0A';
      const msg = encodeURIComponent(
      `🖥️ *Quero a VPS Estruturada*${orderBump ? ' + Suporte' : ''}${NL}${NL}` +
      `———${NL}` +
      `👤 ${customerData.name || '—'}${NL}` +
      `📧 ${customerData.email || '—'}${NL}` +
      `📱 ${customerData.whatsapp || '—'}`
      );
      window.location.href = `https://wa.me/${PHONE}?text=${msg}`;
      }
      } catch {
      const NL = '%0A';
      const msg = encodeURIComponent(
      `🖥️ *Quero a VPS Estruturada*${orderBump ? ' + Suporte' : ''}${NL}${NL}` +
      `———${NL}` +
      `👤 ${customerData.name || '—'}${NL}` +
      `📧 ${customerData.email || '—'}${NL}` +
      `📱 ${customerData.whatsapp || '—'}`
      );
      window.location.href = `https://wa.me/${PHONE}?text=${msg}`;
      }
  };

  return (
    <>
    <Meta
      title="VPS Estruturada — Servidor pronto. Você só faz deploy."
      description="Docker configurado, SSL automático, backup diário, firewall. Setup em 24h. A partir de R$ 297/mês."
      path="/vps"
    />
    <Navbar />
    <main className="min-h-screen bg-[#0a0a0a] overflow-x-hidden" style={{ color: '#ffffff' }}>

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/15 via-[#0a0a0a] to-[#0a0a0a]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Pra quem sabe o que quer</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Sua VPS.<br />
            <span className="text-[#D4AF37]">Configurada.</span> Pronta pra rodar.
          </h1>
          <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
            Docker, SSL, backup, firewall, monitoramento — tudo pronto. Você só faz deploy. Instala o que quiser, roda no seu domínio, se vira.
          </p>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Setup em 24h. A gente estrutura. Você dirige.
          </p>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#C5A028] text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-[#D4AF37]/25 disabled:opacity-60"
          >
            {loading ? 'REDIRECIONANDO…' : 'QUERO MINHA VPS ESTRUTURADA →'}
          </button>
          <p className="text-gray-500 text-sm mt-3">Checkout seguro • Setup em 24h</p>
        </div>
      </section>

      {/* ===== DOR ===== */}
      <section className="py-20 px-4 bg-[#111111]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Configurar VPS do zero é um inferno:</h2>
          <div className="space-y-4">
            {[
              { emoji: '💀', text: 'Servidor cai do nada. Site fora do ar. Cliente liga reclamando.' },
              { emoji: '🔧', text: 'Deploy quebra. Você passa horas debugando algo que deveria levar 2 minutos.' },
              { emoji: '🔓', text: 'SSL expirou. Site aparece como "Não seguro". Confiança vai pro lixo.' },
              { emoji: '📦', text: 'Sem backup. Se o disco corromper, perde tudo. Cliente, dado, histórico.' },
              { emoji: '🐌', text: 'API lenta. Usuário desiste. Venda perdida. Você nem sabe que aconteceu.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-[#0a0a0a] p-5 rounded-xl border border-red-500/20">
                <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                <p className="text-gray-200 text-lg">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOLUÇÃO ===== */}
      <section className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">A gente estrutura. Você dirige.</h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            VPS configurada do zero. Docker rodando, SSL ativo, backup diário, firewall ligado. Você só faz deploy do que quiser.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {[
              { emoji: '🐳', title: 'Docker & Deploy', text: 'Contêineres configurados, CI/CD, rollback automático. Deploy em 1 comando.' },
              { emoji: '📊', title: 'Monitoramento', text: 'Uptime, CPU, RAM, disco. Alerta no WhatsApp. Se cair, você sabe antes do cliente.' },
              { emoji: '🛡️', title: 'Segurança', text: 'Firewall, SSL automático, proteção DDoS. Seu servidor blindado.' },
              { emoji: '💾', title: 'Backup Diário', text: 'Criptografado, armazenado externamente. Se der merda, recupera em minutos.' },
              { emoji: '🔄', title: 'Rollback', text: 'Deploy deu ruim? Volta pro anterior em 1 comando. Sem estresse.' },
              { emoji: '🌐', title: 'SSL Automático', text: 'Let\'s Encrypt com renovação automática. Seu domínio sempre seguro.' },
            ].map((item, i) => (
              <div key={i} className="bg-[#111111] rounded-2xl p-6 border border-[#D4AF37]/20">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.text}</p>
              </div>
            ))}
          </div>

          {/* CARD DE PREÇO + ORDER BUMP + CHECKOUT DIRETO */}
          <div className="bg-[#111111] rounded-3xl p-8 border border-[#D4AF37]/30 max-w-lg mx-auto">
            <div className="text-[#D4AF37] text-sm font-bold uppercase tracking-wider mb-2">VPS ESTRUTURADA</div>
            <div className="text-5xl font-bold text-white mb-2">R$ 297</div>
            <div className="text-gray-400 text-sm mb-6">por mês • setup em 24h • cancele quando quiser</div>
            <ul className="text-left space-y-3 mb-6">
              {[
                'Docker + Docker Compose configurado',
                'Monitoramento 24h com alerta no WhatsApp',
                'Backup automático diário',
                'SSL automático + firewall',
                'Rollback em 1 comando',
                'Setup em 24h',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <span className="text-[#D4AF37]">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* ORDER BUMP — Suporte Técnico */}
            <label className="flex items-start gap-3 cursor-pointer bg-[#D4AF37]/10 rounded-xl p-4 border border-[#D4AF37]/30 mb-6">
              <input
                type="checkbox"
                checked={orderBump}
                onChange={(e) => setOrderBump(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-white/20 bg-[#111111] text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#D4AF37] font-bold">+ Suporte Técnico</span>
                  <span className="text-gray-400 text-xs">(recomendado)</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Especialista no WhatsApp com SLA 24h. Ajuda com deploy, backup, segurança e troubleshooting.
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-gray-500 text-xs line-through">De R$ 547/mês</p>
                  <p className="text-[#D4AF37] font-bold text-lg">R$ 250/mês</p>
                </div>
              </div>
            </label>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-black py-5 rounded-full font-bold text-xl transition-all shadow-lg shadow-[#D4AF37]/25 disabled:opacity-60"
            >
              {loading ? 'REDIRECIONANDO AO CHECKOUT…' : orderBump ? 'FINALIZAR R$ 547/mês →' : 'FINALIZAR R$ 297/mês →'}
            </button>
            <p className="text-gray-500 text-sm mt-3 text-center">Pagamento seguro via AbacatePay</p>
          </div>
        </div>
      </section>

      {/* ===== DEPOIMENTOS ===== */}
      <section className="py-20 px-4 bg-[#111111]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Quem tá rodando em VPS estruturada</h2>
          <p className="text-gray-400 text-center mb-12">Do zero ao deploy em 1 comando.</p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: 'Thiago M.',
                role: 'SaaS de agendamento — MG',
                avatar: '👨‍💻',
                stars: 5,
                text: 'Antes eu passava 3h configurando servidor. Agora faço deploy em 1 comando e vou dormir tranquilo. Backup automático já salvou minha pele uma vez.',
              },
              {
                name: 'Carla R.',
                role: 'E-commerce — PR',
                avatar: '👩‍💼',
                stars: 5,
                text: 'SSL sempre renovando, firewall ligado, monitoramento no WhatsApp. Meu site não cai mais. E quando precisa, o suporte responde em minutos.',
              },
            ].map((c, i) => (
              <div key={i} className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/[0.06]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-lg">
                    {c.avatar}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">{c.name}</h3>
                    <p className="text-gray-500 text-xs">{c.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: c.stars }).map((_, s) => (
                    <span key={s} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GARANTIA ===== */}
      <section className="py-16 px-4 bg-[#0a0a0a]">
        <div className="max-w-lg mx-auto text-center">
          <div className="text-5xl mb-4">🛡️</div>
          <h2 className="text-2xl font-bold text-white mb-3">7 dias de garantia incondicional</h2>
          <p className="text-gray-400 text-lg">
            Se em 7 dias você não estiver satisfeito, devolvemos cada centavo. Sem burocracia. Sem perguntas.
          </p>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-20 px-4 bg-[#111111] text-center overflow-hidden">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Pronto pra parar de configurar servidor?</h2>
          <p className="text-gray-300 mb-8">VPS estruturada, Docker pronto, SSL ativo. Você só faz deploy.</p>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#C5A028] text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-[#D4AF37]/25 disabled:opacity-60"
          >
            {loading ? 'REDIRECIONANDO…' : 'QUERO MINHA VPS ESTRUTURADA →'}
          </button>
          <p className="text-gray-500 text-sm mt-3">Checkout seguro • Setup em 24h</p>
        </div>
      </section>

      <Footer />
    </main>
    </>
  );
}