import { formatDate } from "@utils";

export const normalizeMediaData = (item) => {
  const name = item.title || item.name;
  const date = item.release_date || item.first_air_date;
  const backdrop = item.backdrop_path || item.poster_path;
  const poster = item.poster_path || item.backdrop_path;
  const description = item.overview || "No description available";
  const mediaType = item.media_type || (item.title ? "movie" : "tv");

  return {
    id: item.id,
    name: name,
    date: formatDate(date),
    posterPath: poster,
    backdropPath: backdrop,
    vote_average: item.vote_average,
    description: description,
    media_type: mediaType,
  };
};
