export const getYear = (date, fallback = "") => {
  if (!date) return fallback;

  const year = new Date(date).getFullYear();
  return isNaN(year) ? fallback : year;
};