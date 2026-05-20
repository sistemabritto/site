/** @type {import('next').NextConfig} */
module.exports = {
  // Redirects
  async redirects() {
    return [
      {
        source: '/whatsapp-ia',
        destination: '/whatsapp',
        permanent: true,
      },
    ];
  },
};