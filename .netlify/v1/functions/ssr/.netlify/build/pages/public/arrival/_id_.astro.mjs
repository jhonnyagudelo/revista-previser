/* empty css                                       */
import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, b as addAttribute } from '../../../chunks/astro/server_mO7YOIDS.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$MainLayout } from '../../../chunks/MainLayout_kskydeGL.mjs';
import 'sweetalert2';
import { f as fetchApi } from '../../../chunks/fetchApi_C1hZre4g.mjs';
import '../../../chunks/getConfirmationTime_Du49QgrH.mjs';
/* empty css                                      */
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://revista.previser.com.co");
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const imgUrl = "../../../assest/imgs/conectados_.png";
  const { id } = Astro2.params;
  const endpointCustomer = `/customer/${id}`;
  let guest;
  try {
    guest = await fetchApi(endpointCustomer);
  } catch (error) {
    console.error("Error al obtener datos del invitado:", error);
  }
  if (!guest) {
    throw new Error(`No se encontraron datos para el invitado con ID: ${id}`);
  }
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Confirmar asistencia", "data-astro-cid-cdhhkvxx": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section data-astro-cid-cdhhkvxx> <img class="sm:h-5/6 sm:w-[28em]"${addAttribute(imgUrl, "src")} alt="imagen" width="400" data-astro-cid-cdhhkvxx> <div class="z-10 text-center p-10 center flex flex-col items-center" data-astro-cid-cdhhkvxx> <h1 class="sm:text-6xl p-3 text-white font-bold" data-astro-cid-cdhhkvxx>Bienvenido:</h1> <h2 class="sm:text-5xl p-3 text-white font-bold" data-astro-cid-cdhhkvxx> ${guest?.data?.name?.toUpperCase()} ${guest?.data?.surname?.toUpperCase()} </h2> ${renderComponent($$result2, "ArrivalForm", null, { "server:defer": true, "document": guest?.data?.document, "client:only": "react", "server:component-directive": "defer", "server:component-path": "/Users/develop/Documents/revista-previser/src/components/arrivalForm", "server:component-export": "ArrivalForm", "client:component-hydration": "only", "data-astro-cid-cdhhkvxx": true, "client:component-path": "/Users/develop/Documents/revista-previser/src/components/arrivalForm", "client:component-export": "ArrivalForm" })} </div> </section> ` })} `;
}, "/Users/develop/Documents/revista-previser/src/pages/public/arrival/[id].astro", void 0);

const $$file = "/Users/develop/Documents/revista-previser/src/pages/public/arrival/[id].astro";
const $$url = "/public/arrival/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
