/** @type {import('next').NextConfig} */
const nextConfig = {
  // Redirect old funnel stubs to canonical pages
  async redirects() {
    return [
      { source: '/sistema', destination: '/implementacao-vibe-seller', permanent: true },
    // Quiz variants → canonical quiz
    { source: '/quiz-infra', destination: '/quiz', permanent: true },
    { source: '/quiz-workforce', destination: '/quiz', permanent: true },
    // Qualificacao variants → canonical quiz
    { source: '/qualificacao', destination: '/quiz', permanent: true },
    { source: '/qualificacao-digital', destination: '/quiz', permanent: true },
    { source: '/qualificar-infra', destination: '/quiz', permanent: true },
    { source: '/qualificar-workforce', destination: '/quiz', permanent: true },
    // Resultado variants → canonical resultado
    { source: '/resultado-whatsapp', destination: '/resultado', permanent: true },
    { source: '/resultado-workforce', destination: '/implementacao-vibe-seller', permanent: true },
    // Old product pages → new architecture
    { source: '/socialforce', destination: '/implementacao-vibe-seller', permanent: true },
    { source: '/socialjobs', destination: '/implementacao-vibe-seller', permanent: true },
    { source: '/evonexus', destination: '/implementacao-vibe-seller', permanent: true },
    { source: '/hermes', destination: '/implementacao-vibe-seller', permanent: true },
    { source: '/workforce', destination: '/implementacao-vibe-seller', permanent: true },
    { source: '/devops', destination: '/implementacao-vibe-seller', permanent: true },
    { source: '/saas', destination: '/implementacao-vibe-seller', permanent: true },
    { source: '/engineering', destination: '/implementacao-vibe-seller', permanent: true },
    { source: '/consultoria-devops', destination: '/implementacao-vibe-seller', permanent: true },
    // Gamificacao redirect
    { source: '/gamificacao', destination: '/implementacao-vibe-seller', permanent: true },
    // Produtos descontinuados: preserva tráfego e evita páginas órfãs.
    { source: '/zapclub', destination: '/desafio-monetizar-com-ia', permanent: true },
    { source: '/zapcurso', destination: '/desafio-monetizar-com-ia', permanent: true },
    // Data deletion canonical URL (Meta requirement)
    { source: '/exclusao-de-dados', destination: '/exclusao-dos-dados', permanent: true },
    ];
  },
};

module.exports = nextConfig;
