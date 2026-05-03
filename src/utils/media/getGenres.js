export const getGenreIds = (items = [], key = "genre_ids") => {
  if (!items.length) return [];

  const allIds = items.flatMap((item) => item[key] || []);

  return [...new Set(allIds)];
};

export const getGenresById = (genreIds = [], allGenres = {}) => {
  if (!genreIds.length || !Object.keys(allGenres).length) return [];

  return genreIds
    .map((id) => allGenres[id])
    .filter(Boolean);
};
