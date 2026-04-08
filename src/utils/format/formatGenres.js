export const formatGenres = (genres, fallback = "") => {
  if (!genres || !genres.length) return fallback;

  if (genres.length === 1) {
    return genres[0];
  }

  if (genres.length === 2) {
    return `${genres[0]} and ${genres[1]}`;
  }

  const last = genres[genres.length - 1];
  const rest = genres.slice(0, -1);

  return `${rest.join(", ")} and ${last}`;
};
