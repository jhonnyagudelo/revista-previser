import Swal from "sweetalert2";

// Mapeo de estados HTTP a funciones
const alertMap: Record<
  number,
  (message: string, location?: string, msgBtn?: string) => Promise<void>
> = {
  200: async (message: string, location?: string, msgBtn = "Ok") => {
    await Swal.fire({
      icon: "success",
      title: "Confirmación",
      text: message,
      confirmButtonText: msgBtn,
    });
    location && window.location.replace(location);
  },
  400: async (message: string, location?: string, msgBtn = "Ok") => {
    await Swal.fire({
      icon: "info",
      title: "Ya se reservo tu lugar",
      text: message,
      confirmButtonText: msgBtn,
    });
    location && window.location.replace(location);
  },
  404: async (message: string, msgBtn = "Ok") => {
    await Swal.fire({
      icon: "info",
      title: "Error",
      text: message,
      confirmButtonText: msgBtn,
    });
  },
};

// Función principal que utiliza el mapa
export const alertHandler = async (
  status: number,
  message: string,
  location?: string,
  msgBtn?: string
) => {
  const alertFn =
    alertMap[status] ||
    (async () => {
      await Swal.fire({
        icon: "error",
        title: "Error desconocido",
        text: "Ocurrió un error inesperado.",
        confirmButtonText: msgBtn,
      });
    });

  await alertFn(message, location, msgBtn);
};
