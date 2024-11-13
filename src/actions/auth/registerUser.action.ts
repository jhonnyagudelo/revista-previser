import  prisma  from "../../db";
import { defineAction } from "astro:actions";
import { z } from "astro:content";
import bcrypt from 'bcrypt';

export const registerUser = defineAction({
    accept: 'form',
    input: z.object({
        username: z.string().min(4, "El nombre de usuario debe tener al menos 4 caracteres."),
        role_id: z.number().nonnegative("El ID de rol debe ser un número positivo."),
        password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
    }),
    handler: async ({ username, password, role_id }, { cookies }) => {
        try {
            // Verificar si el usuario ya existe
            const normalizedUsername = username.trim().toLowerCase();

            // Verificar si el usuario ya existe con un nombre normalizado
            const existingUser = await prisma.users.findFirst({
                where: { username: normalizedUsername },
            });
            if (existingUser) {
                return {
                    status: 400,
                    message: "El nombre de usuario ya está en uso.",
                };
            }

            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear el usuario
            const newUser = await prisma.users.create({
                data: {
                    username:normalizedUsername,
                    role_id,
                    password: hashedPassword,
                },
            });

            // Responder con éxito
            return {
                status: 201,
                message: "Usuario creado exitosamente.",
                data: newUser,
            };
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            return {
                status: 500,
                message: "Hubo un error al crear el usuario.",
            };
        }
    },
});