// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: "https://revista.previser.com.co",
  integrations: [react(), tailwind()],
  output: 'hybrid',
  server: {
    port: 3001, // Cambia al puerto que desees
    host: true, // Escucha en todas las interfaces de red
  },
  adapter: node({
    mode: 'standalone'
  })
});