import { formatDate } from "@utils";

export const getMediaRecommendations = (recommendations, limit = 20) => {
  const recommendationsList = recommendations?.results;
  if (!recommendationsList) return [];

  return recommendationsList
    .slice(0, limit)
    .map(item => ({
      id: item.id,
      mediaType: item.media_type || (item.title ? "movie" : "tv"),
      name: item.title || item.name,
      backdropPath: item.backdrop_path || item.poster_path, 
      date: formatDate(item.release_date || item.first_air_date),
      voteAverage: item.vote_average,
    }));
};
