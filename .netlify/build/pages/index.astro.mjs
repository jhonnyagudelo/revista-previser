/* empty css                                 */
import { a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_mO7YOIDS.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$MainLayout } from '../chunks/MainLayout_kskydeGL.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const imgLogo = "../assest/imgs/logo_conectado.png";
  const imgConect = "../assest/imgs/conectados.png";
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Home" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="flex flex-col items-center"> <h3 class="sm:text-3xl text-xl text-white">
Estas cordialmente invitado a
</h3> <img class="m-3"${addAttribute(imgLogo, "src")} width="250" height="250" alt="Logo"> </section> <section></section> <section> <img class="items-center flex sm:w-fit p-3"${addAttribute(imgConect, "src")} alt="Conectados"> <p class="sm:text-xl text-2xl text-white p-8 text-center">
Un espacio único,donde podras descubrir como somos el puente que conecta a
      nuestros clientes con aliados como tu
</p> <div class="border-b-2 border-white w-10/12 mx-auto"></div> <div></div> </section> <section class="pb-8 mb-14"> <p class="text-white text-center text-xl">
¡Esperamos verte y compartir este momento juntos!
</p> </section> ` })}`;
}, "/Users/develop/Documents/revista-previser/src/pages/index.astro", void 0);

const $$file = "/Users/develop/Documents/revista-previser/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
