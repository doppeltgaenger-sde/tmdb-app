import { formatDate } from "@utils";

export const getProfileLibrary = (cast, crew, limit = 20) => {
  const map = new Map();

  const addEntry = (item) => {
    if (map.has(item.id)) return;

    map.set(item.id, {
      id: item.id,
      name: item.title || item.name,
      date: item.release_date || item.first_air_date || "No date available",
      posterPath: item.poster_path || item.backdrop_path,
      voteAverage: item.vote_average || 0,
      voteCount: item.vote_count || 0,
      mediaType: item.media_type || (item.title ? "movie" : "tv"),
    });
  };

  if (cast) cast.forEach(addEntry);
  if (crew) crew.forEach(addEntry);

  return Array.from(map.values())
    .sort((a, b) => {
      const weight = (item) => (item.voteAverage) * Math.log10(item.voteCount + 1);
      return weight(b) - weight(a);
    })
    .slice(0, limit)
    .map(item => ({
      ...item,
      date: formatDate(item.date)
    }));
};
