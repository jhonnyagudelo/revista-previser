import { c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, m as maybeRenderHead, d as renderComponent, e as renderHead, f as renderSlot } from './astro/server_mO7YOIDS.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                         */

const $$Astro$1 = createAstro("https://revista.previser.com.co");
const $$HeadBase = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$HeadBase;
  const { title, description } = Astro2.props;
  return renderTemplate`<!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Font preloads --><link rel="preload" href="/fonts/atkinson-regular.woff" as="font" type="font/woff" crossorigin><link rel="preload" href="/fonts/atkinson-bold.woff" as="font" type="font/woff" crossorigin><!-- Canonical URL --><!-- <link rel="canonical" href={canonicalURL} /> --><!-- Primary Meta Tags --><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(description, "content")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><!-- <meta property="og:image" content={new URL(image, Astro.url)} />  --><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><!-- <meta property="twitter:image" content={new URL(image, Astro.url)} /> -->`;
}, "/home/jhonny/Documentos/revista-previser/src/components/headBase/HeadBase.astro", void 0);

const PublicRoutes = {
  LOGIN: "Login",
  PUBLIC: "public",
  REGISTER: "Register",
  CONFIRM_ATTENDACE: "ConfirmAttendance"
};
const ProtectedRoutes = {
  PROTECTED: "Protected",
  PRIVATE: "protected"
};

const $$NavBar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="flex justify-between px-20 py-5 items-center bg-blue-800"> <h1 class="text-xl text-white font-bold"></h1> <div class="flex items-center"> <div class="flex items-center"></div> <ul class="flex items-center space-x-6"> <li class="font-semibold text-white cursor-pointer"> <a${addAttribute(`/${ProtectedRoutes?.PRIVATE}/${ProtectedRoutes?.PROTECTED}`, "href")}>Home</a> </li> <li class="font-semibold text-white cursor-pointer"> <a${addAttribute(`/${PublicRoutes?.PUBLIC}/${PublicRoutes?.LOGIN}`, "href")}>Ingresar</a> </li> </ul> </div> </nav>`;
}, "/home/jhonny/Documentos/revista-previser/src/components/navBar/NavBar.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header> ${renderComponent($$result, "NavBar", $$NavBar, {})} </header>`;
}, "/home/jhonny/Documentos/revista-previser/src/components/header/Header.astro", void 0);

const siteInfo = {
  title: "Revista previser",
  description: "Revista Previser 2024"
};

const $$Astro = createAstro("https://revista.previser.com.co");
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const {
    title = siteInfo?.title,
    description = siteInfo?.description,
    image
  } = Astro2.props;
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "HeadBase", $$HeadBase, { "title": title, "description": description })}${renderHead()}</head> <body class="bg-blue-800"> ${renderComponent($$result, "Header", $$Header, {})} <main> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "/home/jhonny/Documentos/revista-previser/src/layouts/mainLayout/MainLayout.astro", void 0);

export { $$MainLayout as $ };
