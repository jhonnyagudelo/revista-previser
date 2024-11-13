import prisma from "../db";
import { defineMiddleware } from "astro/middleware";
import bcrypt from 'bcrypt';



const protectedRoutes = ['/protected'];
const requiredRoleId = 1; // Reemplaza con el ID del rol requerido

export const onRequest = defineMiddleware(async ({ url, request, redirect }, next) => {
    const requestedPath = url.pathname;
    const authHeaders = request.headers.get('authorization') ?? '';

    // Check if route requires authorization
    if (!isProtectedRoute(requestedPath)) {
        return next();
    }

    // User authentication check
    const isAuthenticated = await verifyUserAuthentication(authHeaders);

    if (!isAuthenticated) {
        return redirect('/public/login');
    }

    try {
        // Access granted, puedes realizar acciones adicionales aquí si es necesario
        return next();
    } catch (error) {
        console.error('Error during authentication:', error);
        return unauthorizedResponse('Internal server error');
    }
});

function isProtectedRoute(path: string): boolean {
    return protectedRoutes.includes(path);
}

function unauthorizedResponse(message: string): Response {
    return new Response(message, {
        status: 401,
    });
}

async function verifyUserAuthentication(authHeaders: string): Promise<boolean> {
    // Decodificar credenciales básicas
    const decodedValue = Buffer.from(authHeaders.split(' ')[1], 'base64').toString();
    const [username, password] = decodedValue.split(':') as [string, string];

    // Buscar al usuario en la base de datos y obtener su rol
    const user = await prisma.user.findUnique({
        where: { username },
        include: {
            role: true,
        },
    });

    if (!user || !user.role) {
        return false; // Usuario no encontrado o sin rol asignado
    }

    // Validar contraseña y rol
    const isPasswordValid = await bcrypt.compare(password, user.password);
    const hasRequiredRole = user.role.id === requiredRoleId;

    return isPasswordValid && hasRequiredRole;
}
