import prisma from "@/db";
import { jsonResponse } from "@/utilities/jsonResponse";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const { document } = params;
  try {
    const customer = await prisma.customer.findFirst({
      where: { document: document },
    });
    if (!customer) {
      jsonResponse(404, "Cliente no encontrado");
    }

    return jsonResponse(200, "Invitado encontrado", customer);
  } catch (error) {
    console.error("Error en el servidor:", error);
    return jsonResponse(500, "Error interno del servidor.");
  }
};
