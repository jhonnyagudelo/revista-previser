
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // Plugin para manejar UTC
import timezone from 'dayjs/plugin/timezone'; // Plugin para manejar zonas horarias

dayjs.extend(utc);
dayjs.extend(timezone);

 function getConfirmationTime(timezone:string) {
  // Suponiendo que quieres la hora en UTC:
  return dayjs.utc().tz(timezone).format(); // Formatea la fecha en el formato deseado (por ejemplo, 'YYYY-MM-DD HH:mm:ss')
}

// Ejemplo de uso:
export const confirmationTime = getConfirmationTime('America/Bogota'); 