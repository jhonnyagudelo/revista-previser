// src/actions/AsistenciaActions.ts
import { confirmationTime } from '../../utilities/getConfirmationTime';
import prisma from '../../db';
import { defineAction } from 'astro:actions';
import { z } from 'zod';

// Confirmar Asistencia usando la cédula
export const confirmAttendance = defineAction({
    accept: 'form',
    input: z.object({
        document: z.string().min(6, "Número de cédula no válido"), // Validación de longitud
        eventId: z.number().positive(),
    }),

    handler: async ({ document, eventId }) => {
        try {
            // Buscar el cliente por su número de cédula
            const cliente = await prisma.customer.findUnique({
                where: { document },
            });

            // Si el cliente no existe, devolver un mensaje de error
            if (!cliente) {
                return { status: 404, message: "Cliente no encontrado." };
            }

            // Verificar si el registro de asistencia ya existe
            const asistenciaExistente = await prisma.attendace.findUnique({
                where: {
                    customer_id_event_id: {
                        customer_id: cliente.id,
                        event_id: eventId,
                    },
                },
            });

            // Si el registro de asistencia no existe, devolver un error
            if (asistenciaExistente?.confirm_attendance) {
                return { status: 404, message: "No se encontró el registro de asistencia." };
            }

console.log(confirmationTime);
            // Confirmar la asistencia del cliente si aún no ha sido confirmada
            const asistencia = await prisma.attendace.update({
                data: { confirm_attendance: true, confirmation_time: confirmationTime },
                where: {
                    customer_id_event_id: {
                        customer_id: cliente.id,
                        event_id: eventId,
                    },
                },
            });

            return { status: 201, message: "Asistencia confirmada.", data: asistencia };
        } catch (error) {
            console.error("Error al confirmar la asistencia:", error);
            return { status: 500, message: "Error al confirmar la asistencia." };
        }
    },
});