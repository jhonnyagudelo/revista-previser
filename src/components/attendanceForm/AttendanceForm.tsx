import { alertHandler } from '@/utilities/alertHandler';
import React, { useState, type FormEvent } from 'react'

interface AttendanceFormProps {
  id: string;
}
export const AttendanceForm = ({ id }: AttendanceFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      eventId: '1', // Cambia el ID según sea necesario
      document: id.toString(),
    };

    try {
      // Realizar la solicitud al servidor
      const resp = await fetch(`http://localhost:4321/api/attendance/${id}`, {
        method: "PATCH", // Use PATCH as specified in the API route
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!resp.ok) {
        const errorMessage = `Error ${resp.status}: ${resp.statusText}`;
        console.error(errorMessage);
        await alertHandler(resp.status, "No se pudo registrar la asistencia.");
        return;
      }

      const d = await resp.json();
      await alertHandler(d.status, d.message,`/public/confirm/${id}`);
      console.log("Respuesta del servidor:", d);

      // ... 
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
        {loading ? "Procesando..." : "¡Regístrate aquí!"}
      </button>
    </form>
  );
};