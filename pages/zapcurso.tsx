import { useState } from 'react';

export default function ZapCurso() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/abacatepay/checkout/zapcurso');
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Erro ao criar checkout. Tente novamente.');
      }
    } catch {
      alert('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
          <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold mb-6">
            Treinamento
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Chega de contratar gente caro para fazer o que a IA já resolve
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Aprenda a montar, configurar e escalar seu assistente de WhatsApp com inteligência artificial — sem precisar de equipe técnica, sem dor de cabeça.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors text-center"
            >
              {loading ? 'Redirecionando...' : 'Começar Agora — R$ 50/mês'}
            </button>
            <a
              href="#o-que-voce-aprende"
              className="border-2 border-purple-600 text-purple-600 font-bold py-4 px-8 rounded-full text-lg hover:bg-purple-50 transition-colors text-center"
            >
              Ver programa
            </a>
          </div>
        </div>
      </section>

      {/* Problema */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Se você está aqui, provavelmente já passou por isso:
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Gastou R$ 3-5 mil num SDR e ele não converteu nem 10% dos leads',
              'Contratou um infoprodutor e o funil parou de funcionar em 2 semanas',
              'Tem planilha de leads mas ninguém tem tempo de acompanhar',
              'Viu concorrente respondendo em 1 segundo e você demora horas',
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
                <p className="text-gray-800 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solução */}
      <section id="o-que-voce-aprende" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            O ZapCurso não é mais um curso teórico
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            É um método prático, passo a passo, para você montar seu próprio assistente de vendas no WhatsApp — mesmo que nunca tenha programado nada na vida.
          </p>

          <div className="space-y-8">
            {[
              {
                title: 'Módulo 1 — A Base',
                body: 'Entenda como a IA entende o que o cliente quer, e como ensinar ela a responder com a voz da sua marca (sem ficar genérico).',
              },
              {
                title: 'Módulo 2 — O Agente',
                body: 'Configure seu SDR de IA em 48h. Scripts de boas-vindas, qualificação, objeção e follow-up — todos prontos para você importar.',
              },
              {
                title: 'Módulo 3 — O Funil',
                body: 'Aprenda a criar o fluxo de conversão que qualifica, agenda e vende — sem você precisar enviar uma mensagem sequer.',
              },
              {
                title: 'Módulo 4 — A Escala',
                body: 'Integre com CRM, rode relatórios automáticos e expanda para mais dezenas de agentes especialistas no seu funil.',
              },
            ].map((mod, i) => (
              <div key={i} className="border rounded-xl p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{mod.title}</h3>
                <p className="text-gray-600">{mod.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prova */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Quem já aplicou, não volta atrás
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { metric: '50+', label: 'negócios atendidos' },
              { metric: '48h', label: 'setup médio' },
              { metric: '7 dias', label: 'primeiro resultado' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-xl text-center shadow-sm">
                <p className="text-4xl font-bold text-purple-600 mb-2">{item.metric}</p>
                <p className="text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-purple-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Não é falta de esforço. É falta de braço.
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            A gente bota a IA pra trabalhar 24h por você. Setup em 48h. Cancele quando quiser.
          </p>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="bg-white text-purple-600 font-bold py-4 px-10 rounded-full text-lg hover:bg-purple-50 disabled:bg-purple-200 transition-colors"
          >
            {loading ? 'Redirecionando...' : 'Assinar ZapCurso — R$ 50/mês'}
          </button>
          <p className="text-purple-200 text-sm mt-4">
            🔒 Pagamento seguro • PIX e cartão • Cancele quando quiser
          </p>
        </div>
      </section>
    </div>
  );
}
