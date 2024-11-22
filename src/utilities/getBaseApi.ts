// Define an interface for the API URL
interface ApiUrl {
  baseUrl: string;
}

const getApiBaseUrl = (): ApiUrl => {
  if (process.env.NODE_ENV === "production") {
    // URL para producción
    return { baseUrl: "https://revista.previser.com.co/api" };
  } else {
    // URL para desarrollo
    return { baseUrl: "http://localhost:4321/api" };
  }
};

// Define the constant with type assertion
export const API_BASE_URL: ApiUrl = getApiBaseUrl();
