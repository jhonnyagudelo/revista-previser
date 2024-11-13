// src/actions/AsistenciaActions.ts
import prisma from '../../db';
import { defineAction } from 'astro:actions';
import { z } from 'zod';

// Confirmar Asistencia usando la cédula
export const confirmAttendace = defineAction({
    accept: 'form',
    input: z.object({
        document: z.string().min(6, "Número de cédula no válido"), // Validación de longitud
        eventId: z.number().positive(),
    }),
    handler: async ({ document, eventoId }) => {
        try {
            // Buscar cliente por cédula
            const cliente = await prisma.customer.findUnique({
                where: { document },
            });

            // Si no se encuentra el cliente, responder con error
            if (!cliente) {
                return { status: 404, message: "Cliente no encontrado." };
            }

            // Confirmar asistencia del cliente encontrado
            const asistencia = await prisma.attendace.upsert({
                where: { clienteId_eventoId: { customer_id: cliente.id, event_id:eventoId } },
                update: { confirmadoAsistencia: true, horaConfirmacion: new Date() },
                create: {
                    customer_Id: cliente.id,
                    evento_id:eventoId,
                    confirm_attendace: true,
                    confirmation_time: new Date(),
                },
            });

            return { status: 201, message: "Asistencia confirmada.", data: asistencia };
        } catch (error) {
            console.error("Error al confirmar la asistencia:", error);
            return { status: 500, message: "Error al confirmar la asistencia." };
        }
    },
});