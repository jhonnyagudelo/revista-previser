/* empty css                                       */
import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, d as renderComponent } from '../../../chunks/astro/server_mO7YOIDS.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$MainLayout } from '../../../chunks/MainLayout_B6HMRKwJ.mjs';
import 'clsx';
import { f as formatDateOrTime } from '../../../chunks/getConfirmationTime_Du49QgrH.mjs';
import 'sweetalert2';
import { f as fetchApi } from '../../../chunks/fetchApi_1FK-A5RO.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro$1 = createAstro("https://revista.previser.com.co");
const $$Sites = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Sites;
  const { event } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="bg-blue-800 text-white rounded-lg p-4 mb-4 text-center"${addAttribute(`event-${event.id}`, "aria-labelledby")}> <h1${addAttribute(`event-${event.id}`, "id")} class="text-2xl text-white font-bold">
Te esperamos:
</h1> <div class="flex justify-center items-center mt-2"> <div class="text-xl font-bold flex justify-center items-center sm:text-xs"> <span class="p-2 text-xl"> ${formatDateOrTime(event?.date, "dddd").toLocaleUpperCase()} </span> <div class="flex flex-col items-center border-2 border-white bg-white rounded"> <span class="text-7xl text-blue-800"> ${formatDateOrTime(event?.date, "D")} </span> <span class="text-xl font-bold text-blue-800"> ${formatDateOrTime(event?.date, "MMMM").toLocaleUpperCase()} </span> </div> <span class="p-2 text-2xl">${"6:00 PM"}</span> </div> </div> <div class="mt-4"> <p class="text-xl"> <span class="text-2xl font-semibold">Lugar :</span> ${event.place || "Lugar no especificado"} </p> <p class="text-xl">${event.location || "Ubicaci\xF3n no especificada"}</p> </div> </div>`;
}, "/home/jhonny/Documentos/revista-previser/src/components/sites/Sites.astro", void 0);

const $$Astro = createAstro("https://revista.previser.com.co");
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const imgLogo = "../../../assest/imgs/logo_conectado.png";
  const imgConect = "../../../assest/imgs/conectados.png";
  const endpoint = "/event";
  const response = await fetchApi(endpoint);
  const { id } = Astro2.params;
  const endpointCustomer = `/customer/${id}`;
  let guest = null;
  try {
    guest = await fetchApi(endpointCustomer);
  } catch (error) {
    console.error("Error al obtener datos del invitado:", error);
  }
  if (!guest) {
    throw new Error(`No se encontraron datos para el invitado con ID: ${id}`);
  }
  console.log({ guest });
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Home" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="flex flex-col items-center"> <h3 class="sm:text-3xl text-xl text-white">
Estás cordialmente invitado a
</h3> <img class="m-3"${addAttribute(imgLogo, "src")} width="250" height="250" alt="Logo"> </section> <section></section> <section> <img class="items-center flex sm:w-fit p-3"${addAttribute(imgConect, "src")} alt="Conectados"> <p class="sm:text-xl text-2xl text-white p-8 text-center">
Únete a nosotros en una noche diseñada para celebrar nuestra alianza,
      compartir experiencias y crear conexiones valiosas. Queremos que seas
      parte de este encuentro especial, donde celebramos nuestro compromiso
      mutuo de ofrecer el mejor servicio a las más de 1.000 familias que confían
      en Previser.
</p> <div class="border-b-2 border-white w-10/12 mx-auto"></div> <div> <h1 class="text-3xl p-5 text-white text-center m-0"> ${guest?.data?.name?.toUpperCase()} ${guest?.data?.surname?.toUpperCase()} </h1> ${Array.isArray(response) ? response.map((event) => renderTemplate`${renderComponent($$result2, "Sites", $$Sites, { "event": event })}`) : renderTemplate`<p>No events found</p>`} </div> </section> <section class="pb-8 mb-14"> <div class="text-center"> <!-- Aquí puedes incluir el formulario u otros componentes --> ${renderComponent($$result2, "AttendanceForm", null, { "server:defer": true, "document": guest?.data?.document, "client:only": "react", "server:component-directive": "defer", "server:component-path": "@/components/attendanceForm", "server:component-export": "AttendanceForm", "client:component-hydration": "only", "client:component-path": "@/components/attendanceForm", "client:component-export": "AttendanceForm" })} </div> <div class="bg-white rounded text-center mb-3"> <p class="text-blue-800 text-xl">
Por favor, <span class="font-bold">confirma tu asistencia</span> </p> </div> <p class="text-white text-center text-xl">
No te pierdas la oportunidad única de <span>fortalecer tu presencia en el ecosistema Previser</span> <span> ¡Te esperamos con los brazos abiertos! </span> </p> </section> ` })}`;
}, "/home/jhonny/Documentos/revista-previser/src/pages/public/attendance/[id].astro", void 0);

const $$file = "/home/jhonny/Documentos/revista-previser/src/pages/public/attendance/[id].astro";
const $$url = "/public/attendance/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
