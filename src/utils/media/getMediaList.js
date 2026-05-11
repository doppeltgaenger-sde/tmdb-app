import { formatDate } from "@utils";

export const getMediaList = (mediaList) => {
  if (!mediaList) return [];
  
  return mediaList
    .map(item => {
      const hasDate = item.release_date || item.first_air_date;

      return {
        id: item.id,
        mediaType: item.media_type,
        posterPath: item.poster_path || item.backdrop_path,
        name: item.title || item.name,
        date: hasDate 
          ? formatDate(item.release_date || item.first_air_date) 
          : "No date available",
        voteAverage: item.vote_average,
        description: item.overview,
      }
  });
};
