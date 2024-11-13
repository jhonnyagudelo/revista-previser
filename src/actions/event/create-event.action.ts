import prisma from "../../db";
import { defineAction } from "astro:actions";
import { z } from "astro:content";

export const createEvent = defineAction({
    accept: 'form',
    input: z.object({
        event_name: z.string().min(1, "El nombre del evento es requerido"),
        date: z.string().refine((val) => !isNaN(Date.parse(val)), "Debe ser una fecha válida"),
        location: z.string().optional(),
    }),
    handler: async ({ event_name,date,location }) => {
        try {
            const evento = await prisma.event.create({
                data: { event_name, date: new Date(date), location },
            });
            return { status: 201, message: "Evento creado exitosamente.", data: evento };
        } catch (error) {
            console.error("Error al crear el evento:", error);
            return { status: 500, message: "Error al crear el evento." };
        }
    },
});