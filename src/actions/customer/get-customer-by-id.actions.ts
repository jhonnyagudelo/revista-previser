import prisma from "@/db";
import { defineAction } from "astro:actions";
import { z } from "astro:content";

interface Customer {
  id: number;
  document: string;
}

export const getCustomerById = defineAction({
  accept: "json",
  input: z.object({
    document: z.string().min(6, "Número de cédula no válido"), // Validación de longitud mínima
  }),
  handler: async ({ document }) => {
    try {
      const customer: Customer | null = await prisma.customer.findUnique({
        where: { document },
      });
      return customer;
    } catch (error) {
      console.error("Error al confirmar la asistencia:", error);
      return {
        status: 500,
        message: "Error interno al confirmar la asistencia.",
      };
    }
  },
});
