import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
      surface: {
      950: '#0a0a0a',
      900: '#111111',
      800: '#1a1a1a',
      700: '#262626',
      },
      primary: {
      300: '#E8C84A',
      400: '#D4AF37',
      500: '#D4AF37',
      600: '#C5A028',
      },
      gold: {
      400: '#D4AF37',
      500: '#C5A028',
      600: '#B08D1E',
      },
      green: {
      400: '#4ADE80',
      500: '#22C55E',
      600: '#16A34A',
      },
      whatsapp: {
      400: '#4ADE80',
      500: '#25D366',
      600: '#16A34A',
      },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
