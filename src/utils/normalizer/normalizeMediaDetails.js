import { 
  formatDate,
  getYear,
  formatRuntime, 
  formatGenresList,
  getMediaCertification, 
  getMediaTopCrew, 
  normalizeColor, 
  rgbToHsl, 
  getColorFromId,
  formatFullLanguage,
  formatCurrency,
  formatSocials,
  buildRgb,
  getMediaTopCast,
  getMediaRecommendations,
  getMediaCollection,
  getMediaLibrary,
} from "@utils";

export const normalizeCriticalMediaDetails = ({ details: item, releaseDates, contextColor }) => {
  const id = item.id;
  const date = item.release_date || item.first_air_date;
  const mediaType = item.media_type || (item.title ? "movie" : "tv");

  return {
    id,
    mediaType,
    name: item.title || item.name,
    yearDate: getYear(date),
    certification: getMediaCertification(releaseDates, "US"),
    fullDate: formatDate(date),
    
    country: item.origin_country?.[0] 
      || String(item.original_language).toUpperCase()
      || "",

    runtime: formatRuntime(
      item.runtime || (Array.isArray(item.episode_run_time) ? item.episode_run_time[0] : null)
    ),

    genres: formatGenresList(item.genres?.map((g) => g.name) || []),
    voteAverage: item.vote_average,
    trailerId: id,
    tagline: item.tagline || "",
    description: item.overview || "No description available",
    posterPath: item.poster_path || item.backdrop_path,
    backdropPath: item.backdrop_path || item.poster_path,
    
    contextColor: contextColor 
      ? rgbToHsl(normalizeColor(contextColor)) 
      : getColorFromId(id),
    isColorLoaded: !!contextColor,

    crew: getMediaTopCrew(item, mediaType),
    cast: getMediaTopCast(item.credits?.cast || []),
  };
};

export const normalizeContextMediaDetails = ({ details: item }) => {
  const id = item.id;
  const mediaType = item.media_type || (item.title ? "movie" : "tv");

  return {
    library: getMediaLibrary(item.images, item.videos, id, mediaType),
    socials: formatSocials(item.external_ids, item.homepage),
    status: item.status || "", 
    type: item.type || "",
    company: item.production_companies || "",
    network: item.networks || "",
    originalLanguage: formatFullLanguage(item.original_language),
    budget: formatCurrency(item.budget) || "–",
    revenue: formatCurrency(item.revenue) || "–",
  };
};

export const normalizeExtendedMediaDetails = ({ details: item, contextColor }) => {
  return {
    collection: getMediaCollection(item.belongs_to_collection),
    recommendations: getMediaRecommendations(item.recommendations),
    keywords: item.keywords?.keywords || item.keywords?.results || [],
    chartColor: buildRgb(contextColor) || "#0d253f",
  };
};
