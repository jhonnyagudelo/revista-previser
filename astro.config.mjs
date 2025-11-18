// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://revista.previser.com.co",
  integrations: [react(), tailwind()],
  output: "server",
  // Configuración de Astro (y del servidor Vite que usa)
  server: {
    port: 4321, // Cambia al puerto que desees
    host: true, // Escucha en todas las interfaces de red
  },
  // Configuración de Vite expuesta vía Astro
  vite: {
    server: {
      host: "0.0.0.0",
      // Agrega los hostnames permitidos aquí:
      allowedHosts: ["revista.previser.com.co", "localhost", "127.0.0.1"],
    },
  },

  build: {
    assets: "public", // Guarda los estáticos directamente en la carpeta `public`
  },
  adapter: node({
    mode: "standalone",
  }),
});
