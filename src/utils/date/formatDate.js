const defaultFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
});

export const formatDate = (date, fallback = "") => {
  if (!date) return fallback;

  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) return fallback;

  return defaultFormatter.format(parsedDate);
};
