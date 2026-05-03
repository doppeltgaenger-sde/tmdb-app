import { 
  rgbToHsl, 
  normalizeColor, 
  getColorFromId,
  getGenreIds,
  getAverage,
  getCollectionList,
} from "@utils";

export const normalizeCriticalCollectionDetails = ({ details: item, contextColor }) => {
  const id = item.id;

  return {
    id,
    name: item.name || item.original_name,
    genreIds: getGenreIds(item?.parts) || [],
    voteAverage: getAverage(item?.parts) || [],
    description: item.overview || "No description available",
    posterPath: item.poster_path || item.backdrop_path,
    backdropPath: item.backdrop_path || item.poster_path,
    mediaAmount: item.parts?.length || 0,
    
    contextColor: contextColor 
      ? rgbToHsl(normalizeColor(contextColor)) 
      : getColorFromId(id),
    isColorLoaded: !!contextColor,
  };
};

export const normalizeContextCollectionDetails = ({ details: item }) => {
  return {
    collectionList: getCollectionList(item?.parts) || [],
  };
};

export const normalizeExtendedCollectionDetails = ({ details: item, contextColor }) => {
  return {

  };
};
