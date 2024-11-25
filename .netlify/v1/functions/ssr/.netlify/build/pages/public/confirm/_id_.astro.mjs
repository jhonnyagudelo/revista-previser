/* empty css                                       */
import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, b as addAttribute } from '../../../chunks/astro/server_mO7YOIDS.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$MainLayout } from '../../../chunks/MainLayout_kskydeGL.mjs';
import QRCode from 'qrcode';
import { f as fetchApi, b as baseUrlApi } from '../../../chunks/fetchApi_C1hZre4g.mjs';
/* empty css                                      */
export { renderers } from '../../../renderers.mjs';

const generateQRCode = async (url) => {
  try {
    return await QRCode.toDataURL(url, {
      width: 300,
      // Tamaño del QR
      margin: 2
      // Margen alrededor del QR
    });
  } catch (error) {
    console.error("Error generando el código QR:", error);
    throw new Error("No se pudo generar el código QR.");
  }
};

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
  const qrUrl = `${baseUrlApi}/${guest?.data?.id}`;
  const qrCodeUrl = await generateQRCode(qrUrl);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Qr", "data-astro-cid-rd2od5aq": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section data-astro-cid-rd2od5aq> <article class="sm:flex sm:items-center h-dvh sm:h-5/6" data-astro-cid-rd2od5aq> <link rel="preload"${addAttribute(qrCodeUrl, "href")} as="image"> <img class="sm:h-5/6 sm:w-[28em]"${addAttribute(imgUrl, "src")} alt="imagen" width="400" data-astro-cid-rd2od5aq> <div class="z-10 text-center p-10 qr flex flex-col items-center" data-astro-cid-rd2od5aq> <h1 class="sm:text-5xl p-3 text-white font-bold" data-astro-cid-rd2od5aq> ${guest?.data?.name.toUpperCase()} ${guest?.data?.surname.toUpperCase()} </h1> <img${addAttribute(qrCodeUrl, "src")} alt="Código QR generado" class="sm:w-96 sm:h-96 w-60 h-60" data-astro-cid-rd2od5aq> </div> </article> </section> ` })} `;
}, "/Users/develop/Documents/revista-previser/src/pages/public/confirm/[id].astro", void 0);

const $$file = "/Users/develop/Documents/revista-previser/src/pages/public/confirm/[id].astro";
const $$url = "/public/confirm/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
