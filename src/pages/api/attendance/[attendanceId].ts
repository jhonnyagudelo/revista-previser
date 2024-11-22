import prisma from "@/db";

import type { APIRoute } from "astro";

export const prerender = false;

export const PATCH: APIRoute = async ({ params, request }) => {
  try {
    // Leer y validar el cuerpo de la solicitud
    const { eventId, document } = await request.json();

    if (!eventId) {
      return jsonResponse(400, "El campo 'eventId' es requerido.");
    }

    // Validar si `document` está presente
    if (!document) {
      return new Response(`no se encontro el ${document}`);
    }

    const documentString = document.toString();
    const eventIdNumber = Number(eventId);

    if (Number.isNaN(eventIdNumber)) {
      return jsonResponse(400, "El campo 'eventId' debe ser un número válido.");
    }

    // Verificar si el cliente existe
    const cliente = await prisma.customer.findUnique({
      where: { document: documentString },
    });

    if (!cliente) {
      return jsonResponse(404, "Cliente no encontrado.");
    }

    // Verificar si el evento existe
    const evento = await prisma.event.findUnique({
      where: { id: eventIdNumber },
    });

    if (!evento) {
      return jsonResponse(404, "Evento no encontrado.");
    }

    // Buscar el registro de asistencia
    const asistenciaExistente = await prisma.attendace.findFirst({
      where: {
        customer_id: cliente.id,
        event_id: eventIdNumber,
      },
    });

    if (!asistenciaExistente) {
      return jsonResponse(404, "Registro de asistencia no encontrado.");
    }

    // Verificar si ya está confirmada
    if (asistenciaExistente.confirm_attendance) {
      return jsonResponse(400, "La asistencia ya está confirmada.");
    }

    // Confirmar la asistencia
    const confirmTime = new Date();
    const asistenciaActualizada = await prisma.attendace.update({
      where: {
        customer_id_event_id: {
          customer_id: cliente.id,
          event_id: eventIdNumber,
        },
      },
      data: {
        confirm_attendance: true,
        confirmation_time: confirmTime,
      },
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

// Función utilitaria para respuestas JSON
function jsonResponse(
  status: number,
  message: string,
  data: any = null
): Response {
  return new Response(JSON.stringify({ status, message, data }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
