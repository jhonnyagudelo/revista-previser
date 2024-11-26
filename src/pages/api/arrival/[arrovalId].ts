import prisma from "@/db";

import type { APIRoute } from "astro";

export const prerender = false;

export const PATCH: APIRoute = async ({ params, request }) => {
  try {
    // Parsear el cuerpo de la solicitud

    const { customerId, eventId } = await request.json();

    const eventIdNumber = Number(eventId);
    const customerIdNumber = Number(customerId);

    // Validar los parámetros recibidos
    if (!customerIdNumber || !eventIdNumber) {
      return jsonResponse(404, "Parametros obligatorios.");
    }

    // Verificar si el cliente existe
    const customer = await prisma.customer.findUnique({
      where: { document: customerId },
    });

    if (!customer) {
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
    const asistenciaExistente = await prisma.attendace.findUnique({
      where: {
        customer_id_event_id: {
          customer_id: customer.id,
          event_id: evento?.id,
        },
      },
    });

    if (!asistenciaExistente) {
      return jsonResponse(404, "Registro de asistencia no encontrado.");
    }

    // Validar si ya fue confirmada
    if (asistenciaExistente.confirm_arrival) {
      return jsonResponse(400, "Asistencia ya confirmada.");
    }

    // Confirmar la asistencia
    const confirmTime = new Date();
    const asistenciaActualizada = await prisma.attendace.update({
      where: {
        customer_id_event_id: {
          customer_id: customer.id,
          event_id: evento?.id,
        },
      },
      data: {
        confirm_arrival: true,
        arrival_time: confirmTime,
      },
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
