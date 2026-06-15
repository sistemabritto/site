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
      <div className="max-w-3xl mx-auto px-4 py-16">
        <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold mb-6">
          Treinamento WhatsApp IA
        </span>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Domine a arte de vender pelo WhatsApp com IA
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Chega de perder cliente no "vou pensar". Aprenda a automatizar o funil de vendas, qualificar leads e fechar negócios 24h por dia — mesmo enquanto dorme.
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ZapCurso</h2>
          <p className="text-gray-600 mb-6">
            Método passo a passo para montar seu assistente de vendas no WhatsApp usando inteligência artificial. Sem código, sem enrolação.
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">Configuração completa do agente de vendas</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">Scripts de qualificação e objeção</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">Integração com CRM e follow-up automático</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">Acesso vitalício + atualizações</span>
            </li>
          </ul>

          <div className="border-t pt-6 mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">R$ 50</span>
              <span className="text-gray-500">/mês</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Cancele quando quiser, sem multa</p>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors"
          >
            {loading ? 'Redirecionando...' : 'Assinar Agora — R$ 50/mês'}
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            🔒 Pagamento seguro • PIX e cartão
          </p>
        </div>

        <div className="text-center text-gray-600">
          <p>Dúvidas? Fale com a gente no WhatsApp</p>
        </div>
      </div>
    </div>
  );
}
