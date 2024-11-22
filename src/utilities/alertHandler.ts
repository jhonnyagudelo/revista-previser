import Swal from "sweetalert2";

// Mapeo de estados HTTP a funciones
const alertMap: Record<number, (message: string,location?: string) => Promise<void>> = {
  200: async (message: string,location?: string) => {
    await Swal.fire({
      icon: "success",
      title: "Confirmación",
      text: message,
    });
    location && window.location.replace(location);
  },
  400: async (message: string) => {
    await Swal.fire({
      icon: "info",
      title: "Error",
      text: message,
    });
  },
  404: async (message: string) => {
    await Swal.fire({
      icon: "info",
      title: "Error",
      text: message,
    });
  },
};

// Función principal que utiliza el mapa
export const alertHandler = async (status: number, message: string,location?: string) => {
  const alertFn = alertMap[status] || (async () => {
    await Swal.fire({
      icon: "error",
      title: "Error desconocido",
      text: "Ocurrió un error inesperado.",
    });
  });

  await alertFn(message,location);
};
