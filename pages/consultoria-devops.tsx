import Meta from '../components/Meta';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ConsultoriaDevOps() {
  return (
    <>
      <Meta
        title="Consultoria DevOps — Sistema Britto"
        description="Consultoria especializada em infraestrutura, Docker, deploy e segurança. SLA 24h."
        path="/consultoria-devops"
      />

      <Navbar />

      <main className="min-h-screen bg-[#0a0a0a]" style={{ color: '#ffffff' }}>
        
        {/* ===== HERO ===== */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 via-[#0a0a0a] to-[#0a0a0a]" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-6">
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Consultoria especializada</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Seu servidor cai.<br />
              Seu deploy quebra.<br />
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#C5A028] bg-clip-text text-transparent">A gente resolve antes de você perceber.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
              Consultoria DevOps com especialista no seu WhatsApp. SLA 24h. Não precisa contratar time inteiro pra ter infraestrutura de enterprise.
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
              Docker, CI/CD, backup, SSL, firewall, monitoramento. Tudo que sua aplicação precisa pra rodar sem dor de cabeça.
            </p>
            <a href="/qualificar-workforce" className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#C5A028] text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-[#D4AF37]/25">
              QUERO UMA CONSULTORIA →
            </a>
          </div>
        </section>

        {/* ===== PROBLEMA ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Você já passou por isso?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: '💥', title: 'Servidor cai do nada', desc: 'Site fora do ar. Cliente liga reclamando. Você nem sabe que aconteceu.' },
                { icon: '🔧', title: 'Deploy quebra', desc: 'Você passa horas debugando algo que deveria levar 2 minutos.' },
                { icon: '💾', title: 'Sem backup', desc: 'Se o disco corromper, perde tudo. Cliente, dado, histórico.' },
              ].map((item, i) => (
                <div key={i} className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/10">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SOLUCAO / VSL ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Como funciona</h2>
            <p className="text-gray-400 mb-12 text-lg">Não é rocket science. É só braço de quem já fez dezenas de vezes.</p>
            
            {/* VSL PLACEHOLDER */}
            <div className="aspect-video bg-[#111111] rounded-2xl border border-[#D4AF37]/20 flex items-center justify-center mb-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-gray-400 text-lg">VSL em breve</p>
                <p className="text-gray-500 text-sm">Seu vídeo de vendas vai aqui</p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Diagnóstico', desc: 'Mapeamos seus gargalos em 30 min.' },
                { step: '02', title: 'Proposta', desc: 'Você recebe escopo e investimento em 24h.' },
                { step: '03', title: 'Implementação', desc: 'A gente executa. Você acompanha pelo Slack.' },
                { step: '04', title: 'Suporte', desc: 'SLA 24h por 30 dias. Sem surpresa.' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-[#D4AF37]/30 font-mono mb-4">{item.step}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PROVAS ===== */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Resultado real</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'SaaS B2B', before: 'Deploy manual. Downtime 2x/semana. Equipe gasta 10h semana em infra.', after: 'Deploy automático. Zero downtime. Equipe focada no produto.', result: '10h/semana economizadas • 99.9% uptime' },
                { name: 'E-commerce', before: 'Sem backup. SSL expirando. Site lento. Cliente reclamando.', after: 'Backup diário. SSL renovado. CDN ativo. Tudo monitorado.', result: '0 perda de dados • 3x mais rápido' },
                { name: 'Startup Fintech', before: 'Infra em servidor compartilhado. Sem segurança. Não passava em compliance.', after: 'VPS isolada. Firewall. Logs. Tudo documentado pra auditoria.', result: 'Compliance aprovado • SOC2 ready' },
              ].map((c, i) => (
                <div key={i} className="bg-[#0a0a0a] rounded-2xl p-6 border border-[#D4AF37]/20">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-semibold">Antes</div>
                  <p className="text-gray-300 text-sm mb-4">{c.before}</p>
                  <div className="text-xs text-[#D4AF37] uppercase tracking-wider mb-2 font-semibold">Depois</div>
                  <p className="text-gray-200 text-sm mb-4">{c.after}</p>
                  <div className="border-t border-[#D4AF37]/20 pt-3 mt-2">
                    <div className="text-[#D4AF37] text-lg font-bold">{c.result}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-20 px-4 bg-[#0a0a0a]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Seu servidor não precisa ser seu vilão.</h2>
            <p className="text-gray-300 text-lg mb-8">Consultoria DevOps com SLA 24h. Sem contrato longo. Cancele quando quiser.</p>
            <a href="/qualificar-workforce" className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#C5A028] text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-lg shadow-[#D4AF37]/25">
              QUERO UMA CONSULTORIA →
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
