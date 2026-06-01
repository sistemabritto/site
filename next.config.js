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
      // Gamificacao redirect (unused stub)
      { source: '/gamificacao', destination: '/workforce', permanent: true },
    ];
  },
};

module.exports = nextConfig;
