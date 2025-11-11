/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary-blue': 'var(--color-brand-primary-blue)',
        'secondary-blue': 'var(--color-brand-primary-blue-light)',
        'green': 'var(--color-brand-secondary-green)',
        'light-green': 'var(--color-brand-secondary-green-light)',
        'yellow': 'var(--color-yellow)',
        'green-mate': 'var(--color-green-mate)',
        'primary-white-hueso': 'var(--color-white)',
      },
    },
  },
  plugins: [],
}