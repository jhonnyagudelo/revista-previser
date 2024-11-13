import prisma from "../../db";
import { defineAction } from "astro:actions";
import { z } from "astro:content";

export const arrivalConfirmation = defineAction({
    accept: 'form',
    input: z.object({
        clienteId: z.number().positive(),
        eventoId: z.number().positive(),
    }),
    handler: async ({ clienteId, eventoId }) => {
        try {
            const attendace = await prisma.attendace.updateMany({
                where: { clienteId, eventoId },
                data: { confirm_arrival: true, arrival_time: new Date() },
            });

            if (attendace.count === 0) {
                return { status: 404, message: "Asistencia no encontrada" };
            }

            return { status: 200, message: "Llegada confirmada." };
        } catch (error) {
            console.error("Error al confirmar la llegada:", error);
            return { status: 500, message: "Error al confirmar la llegada." };
        }
    },
});