import { alertHandler } from '@/utilities/alertHandler';
import { actions } from 'astro:actions';
import React, { useState, type FormEvent } from 'react'

interface ArrivalFormProps {
  id: number;
}
export const ArrivalForm = ({id}:ArrivalFormProps) => {

    const [loading, setLoading] = useState<boolean>(false)
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
    const formData = new FormData(e.currentTarget);
    formData.append("eventId", "1");
    formData.append("clientId", id.toString());
    console.log({formData})
    try {
        const { data, error } =  await actions.arrivalConfirmation(formData);
        
        if (error) {
            await alertHandler(500, error.message); // 500 para errores del servidor
            return;
        }
        
        // Llamar al componente AlertHandler con los datos del servidor
        await alertHandler(data.status, data.message);
    } catch (error) {
        console.error("Error al confirmar la asistencia:", error);
        await alertHandler(500, "Ocurrió un error inesperado.");
    } finally{
        setLoading(false)
    }
}
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
  )
}