/** @type {import('next').NextConfig} */
const nextConfig = {
  // Redirect old funnel stubs to canonical pages
  async redirects() {
    return [
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
    { source: '/resultado-workforce', destination: '/resultado-digital', permanent: true },
    // Old product pages → new architecture
    { source: '/socialforce', destination: '/socialjobs', permanent: true },
    { source: '/evonexus', destination: '/sistema', permanent: true },
    { source: '/hermes', destination: '/sistema', permanent: true },
    { source: '/vps', destination: '/sistema', permanent: true },
    { source: '/workforce', destination: '/sistema', permanent: true },
    { source: '/devops', destination: '/sistema', permanent: true },
    { source: '/saas', destination: '/sistema', permanent: true },
    { source: '/engineering', destination: '/sistema', permanent: true },
    { source: '/consultoria-devops', destination: '/sistema', permanent: true },
    // Gamificacao redirect
    { source: '/gamificacao', destination: '/sistema', permanent: true },
    ];
  },
};

module.exports = nextConfig;
