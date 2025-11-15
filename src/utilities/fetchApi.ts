import { baseUrlLocal } from "@/consts/baseLocal";
import { API_BASE_URL } from "./getBaseApi";
import { baseUrlApi } from "@/consts/baseApi";

// interface FetchError extends Error {
//   status?: number;
//   statusText?: string;
// }
//
// export const fetchApi = async <T>(
//   endpoint: string,
//   options?: RequestInit,
// ): Promise<T> => {
//   // Usar la propiedad baseUrl del objeto
//   const url = `${API_BASE_URL.baseUrl}${endpoint}`;
//
//   console.log("🚀 Fetching URL:", url); // Debug temporal
//
//   // Headers por defecto que se pueden sobrescribir
//   const defaultHeaders = {
//     "Content-Type": "application/json",
//   };
//
//   const mergedOptions: RequestInit = {
//     ...options,
//     headers: {
//       ...defaultHeaders,
//       ...options?.headers,
//     },
//   };
//
//   try {
//     const response = await fetch(url, mergedOptions);
//
//     if (!response.ok && response?.status === 500) {
//       const error: FetchError = new Error(
//         `HTTP Error ${response.status}: ${response.statusText}`,
//       );
//       error.status = response.status;
//       error.statusText = response.statusText;
//       throw error;
//     }
//
//     if (!response.ok) {
//       const error: FetchError = new Error("");
//       error.status = response.status;
//       error.statusText = response.statusText;
//       throw error;
//     }
//
//     // Verificar que el response tenga contenido
//     const contentType = response.headers.get("content-type");
//     if (!contentType?.includes("application/json")) {
//       throw new Error("La respuesta no es JSON válido");
//     }
//
//     return response.json() as Promise<T>;
//   } catch (error) {
//     console.error("❌ Error en fetchApi:", { url, error });
//
//     // Si es un error de fetch (red, etc), lo re-lanzamos con más contexto
//     if (error instanceof TypeError) {
//       throw new Error(`Error de conexión: ${error.message}`);
//     }
//
//     // Re-lanzar otros errores tal como están
//     throw error;
//   }
// };

export const fetchApi = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const url = `${baseUrlApi}${endpoint}`;
  const response = await fetch(url, options);

  // if (!response.ok) {
  //   throw new Error(`Error ${response.status}: ${response.statusText}`);
  // }

  return response.json() as Promise<T>;
};
