// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import node from '@astrojs/node';

import auth from 'auth-astro';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(),  auth()],
  output: 'hybrid',
  experimental: {
    serverIslands: true,
  },
  adapter: node({
    mode: 'standalone'
  })
});
