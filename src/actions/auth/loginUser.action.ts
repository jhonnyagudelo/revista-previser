import  prisma  from "../../db";
import { defineAction } from "astro:actions";
import { z } from "astro:content";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = import.meta.env.JWT_SECRET;

export const loginUser = defineAction({
  accept: 'form',
  input: z.object({
      username: z.string(),
      password: z.string(),
  }),
  handler: async ({ username, password }, { cookies }) => {}})