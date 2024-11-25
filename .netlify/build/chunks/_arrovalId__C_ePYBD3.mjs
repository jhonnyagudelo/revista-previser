import { p as prisma } from './index_dB0aRVUn.mjs';

const prerender = false;
const PATCH = async ({ params, request }) => {
  try {
    const { customerId, eventId } = await request.json();
    const eventIdNumber = Number(eventId);
    const customerIdNumber = Number(customerId);
    if (!customerIdNumber || !eventIdNumber) {
      return jsonResponse(404, "Parametros obligatorios.");
    }
    const customer = await prisma.customer.findUnique({
      where: { document: customerId }
    });
    if (!customer) {
      return jsonResponse(404, "Cliente no encontrado.");
    }
    const evento = await prisma.event.findUnique({
      where: { id: eventIdNumber }
    });
    if (!evento) {
      return jsonResponse(404, "Evento no encontrado.");
    }
    const asistenciaExistente = await prisma.attendace.findUnique({
      where: {
        customer_id_event_id: {
          customer_id: customer.id,
          event_id: evento?.id
        }
      }
    });
    if (!asistenciaExistente) {
      return jsonResponse(404, "Registro de asistencia no encontrado.");
    }
    if (asistenciaExistente.confirm_arrival) {
      return jsonResponse(400, "Asistencia ya confirmada.");
    }
    const confirmTime = /* @__PURE__ */ new Date();
    const asistenciaActualizada = await prisma.attendace.update({
      where: {
        customer_id_event_id: {
          customer_id: customer.id,
          event_id: evento?.id
        }
      },
      data: {
        confirm_arrival: true,
        arrival_time: confirmTime
      }
    });
    return jsonResponse(
      200,
      "Asistencia confirmada correctamente.",
      asistenciaActualizada
    );
  } catch (error) {
    console.error("Error al confirmar la asistencia:", error);
    return jsonResponse(500, "Error interno del servidor.");
  }
};
function jsonResponse(status, message, data = null) {
  return new Response(JSON.stringify({ status, message, data }), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  PATCH,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

export { PATCH as P, _page as _, prerender as p };
