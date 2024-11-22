import prisma from "@/db";
import { defineAction } from "astro:actions";

export const getCustomer = defineAction({
  accept: "json",
  handler: async () => {
    try {
      const customers = await prisma.customer.findMany();
      return customers;
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
      throw "Error interno del servidor.";
    }
  },
});
