import dayjs from 'dayjs';
import 'dayjs/locale/es.js';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);
const formatDateOrTime = (date, format = "DD/MMM/YY", timezone2 = "America/Bogota") => {
  dayjs.locale("es");
  const dateObj = dayjs.tz(date, timezone2);
  return dateObj.isValid() ? dateObj.format(format) : "--";
};

dayjs.extend(utc);
dayjs.extend(timezone);
function getConfirmationTime(timezone2) {
  return dayjs.utc().tz(timezone2).format();
}
getConfirmationTime("America/Bogota");

export { formatDateOrTime as f };
