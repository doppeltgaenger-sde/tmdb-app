import { formatDate } from "@utils";

export const getCollectionList = (collectionList) => {
  if (!collectionList) return [];
  
  return collectionList
    .map(item => ({
      id: item.id,
      posterPath: item.poster_path,
      name: item.title,
      date: formatDate(item.release_date),
      voteAverage: item.vote_average,
      description: item.overview,
    }));
};

