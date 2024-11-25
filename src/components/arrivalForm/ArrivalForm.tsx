import { fetchApi } from "@/utilities";
import { alertHandler } from "@/utilities/alertHandler";
import React, { useState, type FormEvent } from "react";

interface ArrivalFormProps {
  document: string;
}

interface ArrivalData {
  status: number;
  message: string;
  clientId: string; // Propiedad opcional si existe
}
export const ArrivalForm = ({ document }: ArrivalFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      eventId: 1,
      customerId: document,
    };

    try {
      const endpoint = `/arrival/${document}`;
      const resp = await fetchApi<ArrivalData>(endpoint, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      // Llamar al manejador de alertas en caso de éxito
      await alertHandler(resp.status, "Asistencia confirmada correctamente.");
    } catch (error) {
      console.error("Error al confirmar la asistencia:", error);
      await alertHandler(500, "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className="bg-yellow-400 sm:w-1/4 p-1 w-60 text-center rounded-md mb-5 hover:bg-yellow-200 transition ease-in duration-500 cursor-pointer font-bold text-xl"
        disabled={loading}
      >
        {loading ? "Procesando..." : "¡Asistencia confirmada!"}
      </button>
    </form>
  );
};
