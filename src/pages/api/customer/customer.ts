import prisma from "@/db";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async () => {
  const customer = await prisma.customer.findMany();

  return new Response(JSON.stringify(customer), {
    status: 200,

    headers: {
      "Content-Type": "application/json",
    },
  });
};
