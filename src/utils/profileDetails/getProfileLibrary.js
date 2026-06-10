import { formatDate } from "@utils";

export const getProfileLibrary = (library, limit = 20) => {
  if (!library) return [];

  return library
    .slice(0, limit)
    .map(item => {
      const name = item.title || item.name;
      const date = item.release_date || item.first_air_date || "No date available";
      const poster = item.poster_path || item.backdrop_path;
      const mediaType = item.media_type || (item.title ? "movie" : "tv");

      return {
        id: item.id,
        name: name,
        date: formatDate(date),
        posterPath: poster,
        voteAverage: item.vote_average,
        mediaType: mediaType,
      }
    });
};
