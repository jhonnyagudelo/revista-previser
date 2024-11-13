import  prisma  from "../../db";
import { defineAction } from "astro:actions";

export const getRole = defineAction({
    accept: 'json',
    handler: async () => {
      try {
        const role = await prisma.role.findMany()
        return { status: 200, data: role };
      } catch (error) {
        console.error(error)
        throw 'Error'
      }
    }
  })