import prisma from "@/db";
import { jsonResponse } from "@/utilities/jsonResponse";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const { id } = params;
  try {
    const customer = await prisma.customer.findUnique({
      where: { document: id },
    });

    if (!customer) {
      return jsonResponse(404, "Cliente no encontrado");
    }

    return jsonResponse(200, "Invitado encontrados", customer);
  } catch (error) {
    console.error("Error en el servidor:", error);
    return jsonResponse(500, "Error interno del servidor.");
  }
};
