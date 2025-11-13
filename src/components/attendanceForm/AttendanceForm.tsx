import { fetchApi, PublicRoutes } from "@/utilities";
import { alertHandler } from "@/utilities/alertHandler";
import { HTTP_STATUS } from "@/utilities/httpStatus";
import { useState, type FormEvent } from "react";

interface AttendanceFormProps {
  document: string;
  button?: string;
}

interface AttendanceData {
  status: number;
  message: string;
  document?: string;
}

const EVENT_ID = "1";

export const AttendanceForm = ({ document, button }: AttendanceFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleAttendanceResponse = async (
    response: AttendanceData,
    document: string,
  ) => {
    const { status } = response;

    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
        await alertHandler(
          status,
          "Dale click en el botton QR",
          `/${PublicRoutes?.PUBLIC}/${PublicRoutes?.CONFIRM}/${document}`,
          "QR",
        );
        break;

      case HTTP_STATUS.OK:
        await alertHandler(
          status,
          "Se ha reservado tu lugar.",
          `/${PublicRoutes?.PUBLIC}/${PublicRoutes?.CONFIRM}/${document}`,
        );
        break;

      case HTTP_STATUS.NOT_FOUND:
        await alertHandler(status, "Asistencia confirmada correctamente.");
        break;

      default:
        console.warn(`Estado no manejado: ${status}`);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const requestData = {
      eventId: EVENT_ID,
      document,
    };

    try {
      const endpoint = `/attendance/${document}`;
      const response = await fetchApi<AttendanceData>(endpoint, {
        method: "PATCH",
        body: JSON.stringify(requestData),
        headers: { "Content-Type": "application/json" },
      });

      await handleAttendanceResponse(response, document);
    } catch (error) {
      console.error("Error al confirmar la asistencia:", error);
      await alertHandler(
        HTTP_STATUS.SERVER_ERROR,
        "Ocurrió un error inesperado.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className="bg-yellow sm:w-1/4 p-1 w-60 text-center rounded-md mb-5 hover:bg-yellow-200 transition ease-in duration-500 cursor-pointer font-bold text-xl"
        disabled={loading}
      >
        {loading ? "Procesando..." : button}
      </button>
    </form>
  );
};
