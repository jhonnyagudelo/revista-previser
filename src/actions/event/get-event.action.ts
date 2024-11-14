import prisma from "../../db";
import { defineAction } from "astro:actions";

export const getEvent = defineAction({
    accept: 'json',
    handler: async () => {
      try {
        const event = await prisma.event.findMany()
        return  event ;
      } catch (error) {
        console.error(error)
        throw 'Error'
      }
    }
  })