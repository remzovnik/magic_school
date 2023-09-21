export const durationFormatter = (time: number) => {
  const hourInSeconds = 3600;
  const minuteInSeconds = 60;
  const hours = Math.floor(time / hourInSeconds);
  let minutes: number | string = Math.floor((time - hours * hourInSeconds) / minuteInSeconds);
  let seconds: number | string = time - hours * hourInSeconds - minutes * minuteInSeconds;
  let result = "";

  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  result = `${hours < 10 ? `0${hours}` : hours}:${minutes}:${seconds}`;

  return result;
};
