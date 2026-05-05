import { 
  rgbToHsl, 
  normalizeColor, 
  getColorFromId,
  getGenreIds,
  getCollectionAverage,
  getCollectionTopCast,
  getCollectionTopCrew,
  getCollectionList,
} from "@utils";

export const normalizeCriticalCollectionDetails = ({ details: item, contextColor }) => {
  const id = item.id;

  return {
    id,
    name: item.name || item.original_name,
    genreIds: getGenreIds(item?.parts) || [],
    voteAverage: getCollectionAverage(item?.parts) || [],
    description: item.overview || "No description available",
    posterPath: item.poster_path || item.backdrop_path,
    backdropPath: item.backdrop_path || item.poster_path,
    mediaAmount: item.parts?.length || 0,
    
    contextColor: contextColor 
      ? rgbToHsl(normalizeColor(contextColor)) 
      : getColorFromId(id),
    isColorLoaded: !!contextColor,

    cast: getCollectionTopCast(item?.credits?.cast || []),
  };
};

export const normalizeContextCollectionDetails = ({ details: item }) => {
  return {
    crew: getCollectionTopCrew(item?.credits?.crew || []),
    collectionList: getCollectionList(item?.parts) || [],
  };
};

export const normalizeExtendedCollectionDetails = ({ details: item, contextColor }) => {
  return {

  };
};
