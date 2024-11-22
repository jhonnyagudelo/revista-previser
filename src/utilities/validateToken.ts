import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno");
  }
export const validateToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    console.error("Token no válido:", err);
    return null;
  }
};