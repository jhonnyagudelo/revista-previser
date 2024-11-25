/* empty css                                 */
import { a as createComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_mO7YOIDS.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="page_404" data-astro-cid-zetdm5md> <div class="container" data-astro-cid-zetdm5md> <div class="row" data-astro-cid-zetdm5md> <div class="col-sm-12" data-astro-cid-zetdm5md> <div class="col-sm-10 col-sm-offset-1 text-center" data-astro-cid-zetdm5md> <div class="four_zero_four_bg" data-astro-cid-zetdm5md> <h1 class="text-center" data-astro-cid-zetdm5md>404</h1> </div> <div class="contant_box_404" data-astro-cid-zetdm5md> <h3 class="h2" data-astro-cid-zetdm5md>Parece que estas perdido</h3> <p data-astro-cid-zetdm5md>¡La página que estás buscando no está disponible!</p> <a href="/" class="link_404" data-astro-cid-zetdm5md>Home</a> </div> </div> </div> </div> </div> </section> `;
}, "/home/jhonny/Documentos/revista-previser/src/pages/404.astro", void 0);

const $$file = "/home/jhonny/Documentos/revista-previser/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
