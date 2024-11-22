import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importa el locale español para dayjs
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone); 1  

export const formatDateOrTime = (
  date: Date | string | number,
  format: string = 'DD/MMM/YY',
  timezone: string = 'America/Bogota'
): string => {
  dayjs.locale('es'); // Establece el idioma a español
  
  // Crear el objeto date sin conversión adicional
  const dateObj = dayjs.tz(date, timezone);
  
  // Si la conversión a dayjs falla, retorna '--'
  return dateObj.isValid() ? dateObj.format(format) : '--';
};