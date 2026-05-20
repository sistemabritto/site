import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PHONE = '5511914088571';

const VPS_PRODUCT_ID = 'prod_tZQyF6wjgnECwGAy203fPL0U';
const VPS_COMBO_PRODUCT_ID = 'prod_DREjFsNq1ApYt31ggWssMJzL';

export default function VPS() {
  const [customerData, setCustomerData] = useState({ name: '', email: '', whatsapp: '' });
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [submitted, setSubmitted] = useState(false);
  const [orderBump, setOrderBump] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('qualificacao_customer');
      if (stored) {
        try {
          const data = JSON.parse(stored);
          setCustomerData(data);
          setFormData(data);
        } catch {}
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    const customer = { name: formData.name, email: formData.email, whatsapp: formData.whatsapp };

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('qualificacao_customer', JSON.stringify(customer));
    }

    // Salvar lead
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...customer, source: 'vps-landing' }),
      });
    } catch (err) {
      console.error('Erro ao salvar lead:', err);
    }

    setSubmitted(true);

    // Criar checkout via API com dados do cliente
    const productId = orderBump ? VPS_COMBO_PRODUCT_ID : VPS_PRODUCT_ID;

    try {
      const res = await fetch('/api/abacatepay/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          customer: {
            name: customer.name,
            email: customer.email,
            cellphone: customer.whatsapp || customer.email,
          },
          returnUrl: `${window.location.origin}/obrigado`,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        // Fallback: abrir WhatsApp
        const msg = encodeURIComponent(
          `Fala, Felipe. Quero a VPS Estruturada${orderBump ? ' com Suporte Técnico' : ''}.\n\nNome: ${customer.name}\nEmail: ${customer.email}\nWhatsApp: ${customer.whatsapp}`
        );
        window.location.href = `https://wa.me/${PHONE}?text=${msg}`;
      }
    } catch {
      // Fallback WhatsApp
      const msg = encodeURIComponent(
        `Fala, Felipe. Quero a VPS Estruturada${orderBump ? ' com Suporte Técnico' : ''}.\n\nNome: ${customer.name}\nEmail: ${customer.email}\nWhatsApp: ${customer.whatsapp}`
      );
      window.location.href = `https://wa.me/${PHONE}?text=${msg}`;
    }
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
        description="Docker, monitoramento, backup automático, SSL, firewall. SLA 24h. A partir de R$ 297/mês."
        path="/vps"
      />
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>

        {/* MODAL DE CAPTURA */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
            <div className="bg-[#111111] rounded-3xl p-8 max-w-md w-full border border-[#D4AF37]/30 relative">
              {!submitted ? (
                <>
                  <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">&times;</button>
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">🔧</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Quer estruturar sua VPS?</h3>
                    <p className="text-gray-300 text-sm">Seu email já preenche o checkout automático.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">Nome</label>
                      <input type="text" placeholder="Seu nome" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">Email *</label>
                      <input type="email" placeholder="seu@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none" required />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold block mb-1">WhatsApp</label>
                      <input type="tel" placeholder="(11) 99999-9999" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} className="w-full bg-black/80 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none" />
                    </div>

                    {/* ORDER BUMP — Suporte Técnico */}
                    <label className="flex items-start gap-3 cursor-pointer bg-[#D4AF37]/10 rounded-xl p-4 border border-[#D4AF37]/30">
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
                          Especialista no WhatsApp com SLA 24h. Ajuda com deploy, backup, segurança e troubleshooting. Quem tem infra precisa de suporte humano pra configurar.
                        </p>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-gray-500 text-xs line-through">De R$ 547/mês</p>
                        <p className="text-[#D4AF37] font-bold text-lg">R$ 250/mês</p>
                      </div>
                      </div>
                    </label>

                    <button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-black py-4 rounded-full font-bold text-lg transition-all">
                      FINALIZAR COMPRA →
                    </button>
                    <p className="text-gray-500 text-xs text-center">Pagamento seguro via AbacatePay</p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-white mb-2">Redirecionando pro checkout...</h3>
                  <p className="text-gray-300 text-sm">Seus dados já vão preenchidos.</p>
                </div>
              )}
            </div>
          </div>
        )}

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
 onClick={() => setShowModal(true)}
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
              <div className="text-[#D4AF37] text-sm font-bold uppercase tracking-wider mb-2">PLANO ÚNICO</div>
              <div className="text-5xl font-bold text-white mb-2">R$ 297</div>
              <div className="text-gray-400 text-sm mb-6">por mês • setup em 24h • cancele quando quiser</div>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-[#D4AF37]">&#x2713;</span>
                  Docker + Docker Compose configurado
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-[#D4AF37]">&#x2713;</span>
                  Monitoramento 24/7 com alerta no WhatsApp
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-[#D4AF37]">&#x2713;</span>
                  Backup automático diário
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-[#D4AF37]">&#x2713;</span>
                  SSL automático + firewall
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-[#D4AF37]">&#x2713;</span>
                  Suporte WhatsApp (SLA 24h)
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-[#D4AF37]">&#x2713;</span>
                  Setup em 24h
                </li>
              </ul>

<button
 onClick={() => setShowModal(true)}
 className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-black py-5 rounded-full font-bold text-xl transition-all shadow-lg shadow-[#D4AF37]/25"
>
 QUERO MINHA VPS ESTRUTURADA &#x2192;
              </button>
              <p className="text-gray-500 text-sm mt-3">Pagamento seguro via AbacatePay</p>
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