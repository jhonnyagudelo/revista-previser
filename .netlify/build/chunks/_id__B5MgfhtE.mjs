import { p as prisma } from './index_dB0aRVUn.mjs';

function jsonResponse(status, message, data = null) {
  return new Response(JSON.stringify({ status, message, data }), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

const prerender = false;
const GET = async ({ params, request }) => {
  const { id } = params;
  try {
    const customer = await prisma.customer.findUnique({
      where: { document: id }
    });
    if (!customer) {
      jsonResponse(404, "Cliente no encontrado");
    }
    return jsonResponse(200, "Invitado encontradosss", customer);
  } catch (error) {
    console.error("Error en el servidor:", error);
    return jsonResponse(500, "Error interno del servidor.");
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

export { GET as G, _page as _, prerender as p };
