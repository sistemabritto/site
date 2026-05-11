/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.plasmic.app'], // temporário até migrar todas as imagens
  },
};

module.exports = nextConfig;
