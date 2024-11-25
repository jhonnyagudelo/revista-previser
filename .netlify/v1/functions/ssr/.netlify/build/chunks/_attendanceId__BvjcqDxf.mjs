import { p as prisma } from './index_dB0aRVUn.mjs';

const prerender = false;
const PATCH = async ({ params, request }) => {
  try {
    const { eventId, document } = await request.json();
    if (!eventId) {
      return jsonResponse(400, "El campo 'eventId' es requerido.");
    }
    if (!document) {
      return new Response(`no se encontro el ${document}`);
    }
    const documentString = document.toString();
    const eventIdNumber = Number(eventId);
    if (Number.isNaN(eventIdNumber)) {
      return jsonResponse(400, "El campo 'eventId' debe ser un número válido.");
    }
    const cliente = await prisma.customer.findUnique({
      where: { document: documentString }
    });
    if (!cliente) {
      return jsonResponse(404, "Cliente no encontrado.");
    }
    const evento = await prisma.event.findUnique({
      where: { id: eventIdNumber }
    });
    if (!evento) {
      return jsonResponse(404, "Evento no encontrado.");
    }
    const asistenciaExistente = await prisma.attendace.findFirst({
      where: {
        customer_id: cliente.id,
        event_id: eventIdNumber
      }
    });
    if (!asistenciaExistente) {
      return jsonResponse(404, "Registro de asistencia no encontrado.");
    }
    if (asistenciaExistente.confirm_attendance) {
      return jsonResponse(400, "La asistencia ya está confirmada.");
    }
    const confirmTime = /* @__PURE__ */ new Date();
    const asistenciaActualizada = await prisma.attendace.update({
      where: {
        customer_id_event_id: {
          customer_id: cliente.id,
          event_id: eventIdNumber
        }
      },
      data: {
        confirm_attendance: true,
        confirmation_time: confirmTime
      }
    });
    return jsonResponse(
      200,
      "Asistencia confirmada correctamente.",
      asistenciaActualizada
    );
  } catch (error) {
    console.error("Error en el servidor:", error);
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
