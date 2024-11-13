import { defineAction } from "astro:actions";

export const logout = defineAction({
    handler: async (_, { cookies }) => {
        try {
            // Remover la cookie de autenticación
            cookies.delete('auth_token');

            return {
                status: 200,
                message: "Sesión cerrada exitosamente.",
            };
        } catch (error) {
            console.error("Error al cerrar la sesión:", error);
            return {
                status: 500,
                message: "Hubo un error al cerrar la sesión.",
            };
        }
    },
});