export const formatRuntime = (minutes, fallback = "") => {
  if (!minutes || minutes <= 0) return fallback;

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}m`;

  return `${hours}h ${mins}m`;
};
