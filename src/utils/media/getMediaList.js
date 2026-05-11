import { formatDate } from "@utils";

export const getMediaList = (mediaList) => {
  if (!mediaList) return [];
  
  return mediaList
    .map(item => ({
      id: item.id,
      mediaType: item.media_type,
      posterPath: item.poster_path || item.backdrop_path,
      name: item.title || item.name,
      date: formatDate(item.release_date || item.first_air_date),
      voteAverage: item.vote_average,
      description: item.overview,
    }));
};
