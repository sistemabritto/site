import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PHONE = '5511914088571';

const CHECKOUT_VPS = 'https://pay.abacatepay.com/checkout/D3c0yX8Tg';
const CHECKOUT_VPS_COMBO = 'https://pay.abacatepay.com/checkout/D3c0yX8Tg';

export default function VPS() {
  const [customerData, setCustomerData] = useState({ name: '', email: '', whatsapp: '' });
  const [orderBump, setOrderBump] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('qualificacao_customer');
      if (stored) {
        try {
          setCustomerData(JSON.parse(stored));
        } catch {}
      }
    }
  }, []);

  const handleCheckout = (combo: boolean) => {
    const name = customerData.name || '';
    const email = customerData.email || '';
    const whatsapp = customerData.whatsapp || '';

    const url = new URL(combo ? CHECKOUT_VPS_COMBO : CHECKOUT_VPS);
    url.searchParams.set('customer', JSON.stringify({ name, email, cellphone: whatsapp || email }));
    window.location.href = url.toString();
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Fala, Felipe. Quero saber mais sobre a VPS Estruturada. Pode me chamar?\n\nNome: ${customerData.name}\nEmail: ${customerData.email}\nWhatsApp: ${customerData.whatsapp}`
    );
    window.location.href = `https://wa.me/${PHONE}?text=${msg}`;
  };

  return (
    <>
      <Meta
        title="VPS Estruturada — Servidor que não cai. Deploy que não quebra."
        description="Docker, monitoramento, backup automático, SSL, firewall. SLA 24h. A partir de R$ 97/mês."
        path="/vps"
      />
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

        {/* HERO */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/20 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Infraestrutura sob medida</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Servidor que <span className="text-[#D4AF37]">não cai.</span><br />
              Deploy que <span className="text-[#D4AF37]">não quebra.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
              Docker configurado, monitoramento 24/7, backup automático, SSL, firewall. Sua VPS rodando igual navio, sem você precisar ser técnico.
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Especialista no WhatsApp com SLA 24h. Se cair a gente resolve antes de você perceber.
            </p>
            <button
              onClick={() => handleCheckout(orderBump)}
              className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#C5A028] text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-[#D4AF37]/25"
            >
              QUERO MINHA VPS ESTRUTURADA &#x2192;
            </button>
            <p className="text-gray-500 text-sm mt-3">Setup em 24h. Cancele quando quiser.</p>
          </div>
        </section>

        {/* DORES */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Se sua VPS não é estruturada, você já sabe o que acontece:</h2>
            <div className="space-y-4">
              {[
                { emoji: '\u{1F4A5}', text: 'Servidor cai do nada. Site fora do ar. Cliente liga reclamando.' },
                { emoji: '\u{1F4A2}', text: 'Deploy quebra. Você passa horas debugando algo que deveria levar 2 minutos.' },
                { emoji: '\u{1F50C}', text: 'API lenta. Usuário desiste. Venda perdida. Você nem sabe que aconteceu.' },
                { emoji: '\u{1F50D}', text: 'SSL expirou. Site aparece como "Não seguro". Confiança vai pro lixo.' },
                { emoji: '\u{1F4BE}', text: 'Sem backup. Se o disco corromper, perde tudo. Cliente, dado, histórico.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-[#0a0a0a] p-5 rounded-xl border border-red-500/20">
                  <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                  <p className="text-gray-200 text-lg">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PLANO */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">O que você leva</h2>
            <p className="text-gray-400 text-center mb-12">Tudo que sua VPS precisa pra rodar sem dor de cabeça.</p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-[#111111] rounded-2xl p-6 border border-[#D4AF37]/20">
                <div className="text-3xl mb-3">{'\uD83D\uDCBB'}</div>
                <h3 className="text-white font-bold mb-2">Docker & Deploy</h3>
                <p className="text-gray-400 text-sm">Contêineres configurados, CI/CD, rollback automático. Deploy em 1 comando. Zero surpresa.</p>
              </div>
              <div className="bg-[#111111] rounded-2xl p-6 border border-[#D4AF37]/20">
                <div className="text-3xl mb-3">{'\uD83D\uDD0C'}</div>
                <h3 className="text-white font-bold mb-2">Monitoramento</h3>
                <p className="text-gray-400 text-sm">Uptime, CPU, RAM, disco. Alerta no WhatsApp. Se cair, você sabe antes do cliente.</p>
              </div>
              <div className="bg-[#111111] rounded-2xl p-6 border border-[#D4AF37]/20">
                <div className="text-3xl mb-3">{'\uD83D\uDD12'}</div>
                <h3 className="text-white font-bold mb-2">Segurança</h3>
                <p className="text-gray-400 text-sm">Firewall, SSL automático, backup diário, proteção DDoS. Blindado.</p>
              </div>
              <div className="bg-[#111111] rounded-2xl p-6 border border-[#D4AF37]/20">
                <div className="text-3xl mb-3">{'\u2709\uFE0F'}</div>
                <h3 className="text-white font-bold mb-2">Suporte WhatsApp</h3>
                <p className="text-gray-400 text-sm">Especialista no WhatsApp. SLA 24h. Problema resolvido, não enganado.</p>
              </div>
              <div className="bg-[#111111] rounded-2xl p-6 border border-[#D4AF37]/20">
                <div className="text-3xl mb-3">{'\uD83D\uDCC8'}</div>
                <h3 className="text-white font-bold mb-2">Backup Automático</h3>
                <p className="text-gray-400 text-sm">Diário, criptografado, armazenado externamente. Se der merda, recupera em minutos.</p>
              </div>
              <div className="bg-[#111111] rounded-2xl p-6 border border-[#D4AF37]/20">
                <div className="text-3xl mb-3">{'\uD83D\uDD04'}</div>
                <h3 className="text-white font-bold mb-2">Rollback</h3>
                <p className="text-gray-400 text-sm">Deploy deu ruim? Volta pro anterior em 1 comando. Sem estresse.</p>
              </div>
            </div>

            {/* Card de Preço */}
            <div className="bg-[#111111] rounded-3xl p-8 border border-[#D4AF37]/30 max-w-lg mx-auto">
              <div className="bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-3">{'\\u26A0\\uFE0F'} OFERTA ÚNICA</div>
              <div className="text-[#D4AF37] text-sm font-bold uppercase tracking-wider mb-2">VPS ESTRUTURADA</div>
              <div className="text-5xl font-bold text-white mb-2">R$ 297</div>
              <div className="text-gray-400 text-sm mb-6">por mês • setup em 24h • cancele quando quiser</div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-[#D4AF37]">{'\\u2713'}</span>
                  Docker + Docker Compose configurado
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-[#D4AF37]">{'\\u2713'}</span>
                  Monitoramento 24/7 com alerta no WhatsApp
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-[#D4AF37]">{'\\u2713'}</span>
                  Backup automático diário
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-[#D4AF37]">{'\\u2713'}</span>
                  SSL automático + firewall
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-[#D4AF37]">{'\\u2713'}</span>
                  Setup em 24h
                </li>
              </ul>

              <button
                onClick={() => handleCheckout(false)}
                className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-black py-5 rounded-full font-bold text-xl transition-all shadow-lg shadow-[#D4AF37]/25"
              >
                QUERO MINHA VPS ESTRUTURADA {'\\u2192'}
              </button>
              <p className="text-gray-500 text-sm mt-3">Pagamento seguro via AbacatePay</p>
            </div>

            {/* Order Bump — One Time Offer (só aparece no modal) */}
            <div className="bg-gradient-to-r from-red-500/10 to-[#D4AF37]/10 rounded-2xl p-6 border border-red-500/30 max-w-lg mx-auto mt-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={orderBump}
                  onChange={(e) => setOrderBump(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-white/20 bg-[#111111] text-red-500 focus:ring-red-500"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-0.5 rounded-full">{'\\u26A1'} ONE TIME OFFER</span>
                    <span className="text-gray-400 text-sm">+ Suporte DevOps</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Especialista técnico no WhatsApp com SLA 24h. Ajuda com atualizações, backup, integrações, deploy e troubleshooting. 50% de desconto no suporte técnico mensal de DevOps. Essa oferta não vai aparecer de novo.
                  </p>
                  <p className="text-red-400 font-bold text-lg mt-2">+ R$ 250/mês</p>
                  <p className="text-[#D4AF37] font-bold text-lg">{'\\u2192'} R$ 547/mês (VPS + Suporte)</p>
                </div>
              </label>
              <button
                onClick={() => handleCheckout(true)}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-bold transition-all mt-4"
              >
                QUERO COM SUPORTE DEVOPS {'\\u2192'}
              </button>
            </div>
          </div>
        </section>

        {/* CTA PRO WHATSAPP */}
        <section className="py-20 px-4 bg-[#111111] text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Quer um orçamento sob medida?</h2>
          <p className="text-gray-300 mb-8">Fala com a gente. A gente entende seu caso e monta a solução certa.</p>
          <button
            onClick={handleWhatsApp}
            className="bg-green-500 hover:bg-green-600 text-black px-10 py-5 rounded-full font-bold text-xl transition-all shadow-lg shadow-green-500/25"
          >
            FALAR COM ESPECIALISTA &#x2192;
          </button>
        </section>

        <Footer />
      </main>
    </>
  );
}