import prisma from "../../db";
import { defineAction } from "astro:actions";

export const getCustomer = defineAction({
    accept: 'json',
    handler: async () => {
      try {
        const customer = await prisma.customer.findMany()
        return { status: 200, data: customer };
      } catch (error) {
        console.error(error)
        throw 'Error'
      }
    }
  })