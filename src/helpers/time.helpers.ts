export const getTimeFragmentsFromSeconds = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  const seconds = totalSeconds - minutes * 60 - hours * 3600;

  return {
    hours,
    minutes,
    seconds,
  };
};

export const formatSecondsToTime = (totalSeconds: number) => {
  const { hours, minutes, seconds } = getTimeFragmentsFromSeconds(totalSeconds);

  return `${`${hours}`.padStart(2, "0")}:${`${minutes}`.padStart(
    2,
    "0"
  )}:${`${seconds}`.padStart(2, "0")}`;
};
