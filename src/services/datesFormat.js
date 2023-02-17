export const timestampToHourMinutes = (timestamp) =>
  new Date(timestamp * 1000)
    .toLocaleTimeString("fr-FR")
    .split(":")
    .slice(0, -1)
    .join("h");
