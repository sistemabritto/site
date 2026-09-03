import Image from 'next/image';
import { useEffect, useState } from 'react';

const lots = [
  { limit: 5_000, price: 97 },
  { limit: 10_000, price: 127 },
  { limit: 50_000, price: 147 },
  { limit: 100_000, price: 197 },
];

function formatFollowers(value: number) {
  return new Intl.NumberFormat('pt-BR').format(value);
}

export default function FollowerLot() {
  const [followers, setFollowers] = useState<number | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    fetch('/api/instagram/followers')
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data: { followers: number }) => {
        if (typeof data.followers === 'number') {
          setFollowers(data.followers);
          setLive(true);
        }
      })
      .catch(() => undefined);
  }, []);

  const current = followers === null ? lots[0] : lots.find((lot) => followers <= lot.limit) || lots[lots.length - 1];

  return (
    <section className="mx-auto mt-8 max-w-3xl rounded-3xl border border-white/10 bg-[#080b12] p-5 text-left sm:p-7" aria-label="Lotes do Desafio Monetizar com IA">
      <div className="flex items-center gap-4">
        <Image src="/felipe-autoridade-v2.webp" alt="Felipe Britto" width={96} height={96} className="h-16 w-16 rounded-2xl object-cover ring-2 ring-[#a3ff12]/50" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-[.14em] text-[#c4ff72]">Lote por crescimento do perfil</p>
          <p className="mt-1 font-heading text-xl font-bold text-white">Enquanto a comunidade cresce, a entrada muda.</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">{live && followers !== null ? <><strong className="font-semibold text-slate-200">@sistemabritto: {formatFollowers(followers)} seguidores</strong> · atualização pela conta profissional.</> : <>O lote atual vale até 5.000 seguidores no perfil.</>}</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {lots.map((lot) => {
          const active = lot.price === current.price;
          return <div key={lot.limit} className={`rounded-xl border p-3 ${active ? 'border-[#a3ff12]/60 bg-[#a3ff12]/10' : 'border-white/10 bg-white/[.025]'}`}><p className="text-xs text-slate-400">até {formatFollowers(lot.limit)}</p><p className={`mt-1 font-heading text-lg font-bold ${active ? 'text-[#c4ff72]' : 'text-white'}`}>R$ {lot.price}</p>{active && <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-[#c4ff72]">Lote atual</p>}</div>;
        })}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-slate-400">O seu preço fica garantido no checkout. A mudança de lote vale apenas para novas inscrições.</p>
    </section>
  );
}
