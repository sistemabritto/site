import Meta from '../components/Meta';

export default function ObrigadoDesafio() {
  return (
    <>
      <Meta title="Inscrição recebida | Desafio Monetizar com IA" description="Sua inscrição no Desafio Monetizar com IA foi recebida." path="/obrigado-desafio" noIndex />
      <main className="flex min-h-screen items-center justify-center bg-[#080b12] px-5 text-center text-white">
        <section className="max-w-xl rounded-3xl border border-[#a3ff12]/30 bg-white/[0.04] p-8 sm:p-12">
          <p className="text-4xl">✓</p>
          <h1 className="mt-5 font-heading text-4xl font-bold tracking-tight">Inscrição recebida.</h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">Assim que o pagamento for confirmado, as instruções da turma serão enviadas para o contato usado no checkout.</p>
          <a href="https://instagram.com/sistemabritto" target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-xl bg-[#a3ff12] px-6 py-4 font-extrabold text-black transition hover:bg-[#c4ff72]">Acompanhar @sistemabritto →</a>
        </section>
      </main>
    </>
  );
}
