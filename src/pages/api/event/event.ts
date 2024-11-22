import prisma from "@/db";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async () => {
  const event = await prisma.event.findMany();

  return new Response(JSON.stringify(event), {
    status: 200,

    headers: {
      "Content-Type": "application/json",
    },
  });
};
