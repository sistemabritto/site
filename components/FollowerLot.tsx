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
  const [profile, setProfile] = useState<{ followers: number; following: number; posts: number; username: string } | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    fetch('/api/instagram/followers')
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data: { followers: number; following: number; posts: number; username: string }) => {
        if (typeof data.followers === 'number') {
          setProfile(data);
          setLive(true);
        }
      })
      .catch(() => undefined);
  }, []);

  const followers = profile?.followers ?? null;
  const current = followers === null ? lots[0] : lots.find((lot) => followers <= lot.limit) || lots[lots.length - 1];
  const previousLimit = lots.findIndex((lot) => lot.price === current.price) === 0 ? 0 : lots[lots.findIndex((lot) => lot.price === current.price) - 1].limit;
  const progress = followers === null ? 0 : Math.min(100, Math.max(0, ((followers - previousLimit) / (current.limit - previousLimit)) * 100));
  const toNextLot = followers === null ? null : Math.max(0, current.limit - followers);

  return (
    <section className="mx-auto mt-8 max-w-3xl rounded-3xl border border-white/10 bg-[#080b12] p-5 text-left sm:p-7" aria-label="Perfil do Instagram e lotes do Desafio Monetizar com IA">
      <div className="flex items-center gap-4">
        <Image src="/felipe-autoridade-v2.webp" alt="Felipe Britto" width={96} height={96} className="h-16 w-16 rounded-full object-cover ring-2 ring-[#a3ff12]/50" />
        <div className="min-w-0 flex-1">
          <p className="font-heading text-lg font-bold text-white">@{profile?.username || 'sistemabritto'}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">Felipe Britto · Vibe Seller 🦈</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[.025] py-3 text-center">
        <div><p className="font-heading text-lg font-bold text-white">{profile ? formatFollowers(profile.posts) : '—'}</p><p className="text-xs text-slate-400">posts</p></div>
        <div><p className="font-heading text-lg font-bold text-white">{profile ? formatFollowers(profile.followers) : '—'}</p><p className="text-xs text-slate-400">seguidores</p></div>
        <div><p className="font-heading text-lg font-bold text-white">{profile ? formatFollowers(profile.following) : '—'}</p><p className="text-xs text-slate-400">seguindo</p></div>
      </div>
      <div className="mt-6">
        <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-[#c4ff72]">Lote por crescimento do perfil</p><p className="mt-1 font-heading text-xl font-bold text-white">O lote atual é R$ {current.price}.</p></div><p className="text-right text-xs text-slate-400">{live && toNextLot !== null ? `faltam ${formatFollowers(toNextLot)} para o próximo lote` : 'atualizando pela conta profissional'}</p></div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10" aria-label={live ? `${Math.round(progress)}% até o próximo lote` : 'Aguardando atualização do perfil'}><div className="h-full rounded-full bg-[#a3ff12] transition-[width] duration-700" style={{ width: `${progress}%` }} /></div>
        <div className="mt-2 flex justify-between text-xs text-slate-500"><span>{previousLimit ? formatFollowers(previousLimit) : '0'}</span><span>próximo: {formatFollowers(current.limit)} seguidores</span></div>
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
