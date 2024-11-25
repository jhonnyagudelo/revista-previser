// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://revista.previser.com.co",
  integrations: [react(), tailwind()],
  output: "server",
  server: {
    port: 3001, // Cambia al puerto que desees
    host: true, // Escucha en todas las interfaces de red
  },
  build: {
    assets: "public", // Guarda los estáticos directamente en la carpeta `public`
  },
  adapter: netlify(),
});