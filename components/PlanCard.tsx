import React from 'react';

interface PlanCardProps {
  name: string;
  price: number;
  description: string;
  features: string[];
  badge?: string;
  highlighted?: boolean;
  productId: string;
  ctaLabel?: string;
}

function getCustomerFromSession(): { name: string; email: string; cellphone: string } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem('qualificacao_customer');
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data.email) return null;
    return {
      name: data.name || data.email.split('@')[0],
      email: data.email,
      cellphone: data.whatsapp || '',
    };
  } catch {
    return null;
  }
}

function getUtmsFromUrl(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  return utm;
}

export default function PlanCard({ 
  name, 
  price, 
  description, 
  features, 
  badge,
  highlighted = false,
  productId,
  ctaLabel = 'Assinar'
}: PlanCardProps) {
  const handleSubscribe = () => {
    const customer = getCustomerFromSession();
    const utms = getUtmsFromUrl();

    fetch('/api/abacatepay/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        productId,
        customer: customer || undefined,
        metadata: {
          ...utms,
          page: window.location.pathname,
        },
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.url) {
          window.location.href = data.url;
        }
      })
      .catch(console.error);
  };

  return (
    <div className={`relative rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-2 ${
      highlighted 
        ? 'bg-gradient-to-br from-gold-600/20 to-gold-500/10 border-gold-500/50 shadow-2xl shadow-gold-500/20' 
        : 'bg-surface-900/90 border-white/15 hover:border-gold-500/30'
    }`}>
      {badge && (
        <span className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
          highlighted 
            ? 'bg-gold-500 text-surface-900' 
            : 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
        }`}>
          {badge}
        </span>
      )}

      <div className="text-center mb-6">
        <h3 className={`text-2xl font-heading font-bold mb-2 ${highlighted ? 'text-gold-400' : 'text-white'}`}>
          {name}
        </h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-white text-sm">R$</span>
          <span className={`text-5xl font-heading font-bold ${highlighted ? 'text-white' : 'text-gold-400'}`}>
            {price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-gray-400 text-sm">/mês</span>
        </div>
        <p className="text-gray-400 text-sm mt-3">{description}</p>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
            <span className={`mt-0.5 flex-shrink-0 ${highlighted ? 'text-gold-400' : 'text-green-400'}`}>
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubscribe}
        className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${
          highlighted
            ? 'bg-gold-500 hover:bg-gold-600 text-surface-900 shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40'
            : 'glass-strong text-white border border-white/20 hover:bg-white/10'
        }`}
      >
        {ctaLabel}
      </button>

      {highlighted && (
        <p className="text-center text-xs text-gold-400 font-semibold mt-4 animate-pulse">
          ⚡ Mais popular
        </p>
      )}
    </div>
  );
}
