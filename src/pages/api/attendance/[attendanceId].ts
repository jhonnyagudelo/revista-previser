import prisma from "@/db";

import type { APIRoute } from "astro";

export const prerender = false;

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    // Parsear el cuerpo de la solicitud
    const { customerId, eventId } = await request.json();

    // Validar los parámetros recibidos
    if (!customerId || !eventId) {
      return new Response(
        JSON.stringify({ message: "Faltan parámetros obligatorios." }),
        { status: 400 }
      );
    }

    // Verificar si el cliente existe
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      return new Response(
        JSON.stringify({ message: "Cliente no encontrado." }),
        { status: 404 }
      );
    }

    // Verificar si el evento existe
    const evento = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!evento) {
      return new Response(
        JSON.stringify({ message: "Evento no encontrado." }),
        { status: 404 }
      );
    }

    // Buscar el registro de asistencia
    const asistenciaExistente = await prisma.attendace.findUnique({
      where: {
        customer_id_event_id: {
          customer_id: customer.id,
          event_id: eventId,
        },
      },
    });

    if (!asistenciaExistente) {
      return new Response(
        JSON.stringify({ message: "Registro de asistencia no encontrado." }),
        { status: 404 }
      );
    }

    // Validar si ya fue confirmada
    if (asistenciaExistente.confirm_arrival) {
      return new Response(
        JSON.stringify({ message: "La asistencia ya está confirmada." }),
        { status: 400 }
      );
    }

    // Confirmar la asistencia
    const confirmTime = new Date();
    const asistenciaActualizada = await prisma.attendace.update({
      where: {
        customer_id_event_id: {
          customer_id: customer.id,
          event_id: eventId,
        },
      },
      data: {
        confirm_arrival: true,
        arrival_time: confirmTime,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Asistencia confirmada correctamente.",
        data: asistenciaActualizada,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al confirmar la asistencia:", error);
    return new Response(
      JSON.stringify({
        message: "Error interno al confirmar la asistencia.",
      }),
      { status: 500 }
    );
  }
};

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
    console.log(cliente);

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
