import prisma from "@/db";
import { defineAction } from "astro:actions";
import { z } from "astro:content";

export const confirmAttendance = defineAction({
    accept: 'form',
    input: z.object({
        document: z.string().min(6, "Número de cédula no válido"), // Validación de longitud mínima
        eventId: z.number().positive("El ID del evento debe ser un número positivo."),
    }),

    handler: async ({ document, eventId }) => {
        try {
            console.log("Iniciando confirmación de asistencia...");

            // Verificar si el cliente existe
            const cliente = await prisma.customer.findUnique({
                where: { document },
            });

            if (!cliente) {
                console.log("Cliente no encontrado con el documento:", document);
                return { status: 404, message: "Cliente no encontrado." };
            }

            console.log("Cliente encontrado:", cliente);

            // Verificar si el evento existe
            const evento = await prisma.event.findUnique({
                where: { id: eventId },
            });

            if (!evento) {
                console.log("Evento no encontrado con el ID:", eventId);
                return { status: 404, message: "Evento no encontrado." };
            }

            console.log("Evento encontrado:", evento);

            // Buscar el registro de asistencia
            const asistenciaExistente = await prisma.attendace.findUnique({
                where: {
                    customer_id_event_id: {
                        customer_id: cliente.id,
                        event_id: eventId,
                    },
                },
            });

            if (!asistenciaExistente) {
                console.log("Registro de asistencia no encontrado.");
                return { status: 404, message: "Registro de asistencia no encontrado." };
            }

            console.log("Registro de asistencia encontrado:", asistenciaExistente);

            // Validar si ya fue confirmada
            if (asistenciaExistente.confirm_attendance) {
                console.log("La asistencia ya fue confirmada.");
                return { status: 400, message: "La asistencia ya está confirmada." };
            }

            // Confirmar la asistencia
            const confirmTime = new Date();
            const asistenciaActualizada = await prisma.attendace.update({
                where: {
                    customer_id_event_id: {
                        customer_id: cliente.id,
                        event_id: eventId,
                    },
                },
                data: {
                    confirm_attendance: true,
                    confirmation_time: confirmTime,
                },
            });

            console.log("Asistencia confirmada exitosamente:", asistenciaActualizada);

            return {
                status: 200,
                message: "Asistencia confirmada correctamente.",
                data: asistenciaActualizada,
            };
        } catch (error) {
            console.error("Error al confirmar la asistencia:", error);
            return { status: 500, message: "Error interno al confirmar la asistencia." };
        }
    },
});
