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
  handler: async ({ username, password }, { cookies }) => {
      try {
          const normalizedUsername = username.trim().toLowerCase();

          const user = await prisma.users.findFirst({
              where: { username: normalizedUsername },
          });

          if (!user) {
              return {
                  status: 400,
                  message: "Nombre de usuario o contraseña incorrectos.",
              };
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
              return {
                  status: 400,
                  message: "Nombre de usuario o contraseña incorrectos.",
              };
          }

          const token = jwt.sign({ userId: user.id, role: user.role_id }, JWT_SECRET, {
            expiresIn: '1h',
        });
        
        // Define la fecha de expiración de la cookie
        const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora en milisegundos
        
        //  cookies.set('auth_token', token, {
  //          httpOnly: true,
    //        secure: import.meta.env.MODE === 'production',
      //      path: '/',           // Asegúrate de incluir 'path' si es necesario
        //    expires,             // Usa expires en lugar de maxAge
        //});

          return {
              status: 200,
              message: "Inicio de sesión exitoso.",
          };
      } catch (error) {
          console.error("Error en el inicio de sesión:", error);
          return {
              status: 500,
              message: "Hubo un error al iniciar sesión.",
          };
      }
  },
});