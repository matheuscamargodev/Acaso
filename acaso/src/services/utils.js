import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const calculateLastAccess = (lastAccess) => {
  const currentTime = dayjs();
  const lastAccessTime = dayjs(lastAccess).subtract(3, "hour");
  const timeDifferenceInMinutes = currentTime.diff(lastAccessTime, "minute");
  const timeDifferenceInHours = currentTime.diff(lastAccessTime, "hour");
  const timeDifferenceInDays = currentTime.diff(lastAccessTime, "day");

  if (timeDifferenceInMinutes < 60) {
    return `${timeDifferenceInMinutes} minutos atrás`;
  } else if (timeDifferenceInHours < 24) {
    return `${timeDifferenceInHours} horas atrás`;
  } else {
    return `${timeDifferenceInDays} dias atrás`;
  }
};
