// Define an interface for the API URL
interface ApiUrl {
  baseUrl: string;
}

const getApiBaseUrl = (): ApiUrl => {
  // CLAVE: Usar import.meta.env.MODE, que Vite/Astro define
  if (import.meta.env.MODE === "production") {
    // URL para producción
    return { baseUrl: "https://revista.previser.com.co/api" };
  } else {
    // URL para desarrollo
    // Nota: localhost:4321 es la URL predeterminada de Astro
    return { baseUrl: "http://localhost:4321/api" };
  }
};

// Define the constant with type assertion
export const API_BASE_URL: ApiUrl = getApiBaseUrl();
