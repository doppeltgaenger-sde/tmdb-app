import { 
  formatDate,
  getYear,
  formatRuntime, 
  formatGenresList,
  getCertification, 
  getTopCrew, 
  normalizeColor, 
  rgbToHsl, 
  getColorFromId,
  formatFullLanguage,
  formatCurrency,
  formatSocials,
  buildRgb,
  getTopCast,
  getRecommendations,
  getCollection,
  getLibrary,
} from "@utils";

export const normalizeMediaDetails = ({ details: item, releaseDates, contextColor }) => {
  const id = item.id;
  const name = item.title || item.name;
  const date = item.release_date || item.first_air_date;
  const fullDate = formatDate(date);
  const yearDate = getYear(date);
  const poster = item.poster_path || item.backdrop_path;
  const backdrop = item.backdrop_path || item.poster_path;
  const description = item.overview || "No description available";
  const tagline = item.tagline || "";
  const mediaType = item.media_type || (item.title ? "movie" : "tv");

  const runtime =
    item.runtime ||
    (Array.isArray(item.episode_run_time) ? item.episode_run_time[0] : null);

  const runtimeContent = formatRuntime(runtime);

  const country = item.origin_country?.[0] 
    || String(item.original_language).toUpperCase()
    || "";

  const genres = item.genres?.map((g) => g.name) || [];
  const genresList = formatGenresList(genres);
  const certification = getCertification(releaseDates, "US");
  const crew = getTopCrew(item, mediaType);

  const contextColorTheme = contextColor 
    ? rgbToHsl(normalizeColor(contextColor)) 
    : getColorFromId(item.id);

  const status =  item.status || ""; 
  const type = item.type || "";
  const company = item.production_companies || "";
  const network = item.networks || "";
  const originalLanguage = formatFullLanguage(item.original_language);
  const budget = formatCurrency(item.budget) || "–";
  const revenue = formatCurrency(item.revenue) || "–";

  const keywords =  item.keywords?.keywords 
    || item.keywords?.results
    || [];

  const socials = formatSocials(item.external_ids, item.homepage);
  const chartColor = buildRgb(contextColor) || "#0d253f";
  const cast = item.credits?.cast || [];
  const topCast = getTopCast(cast);
  const recommendations = getRecommendations(item.recommendations);
  const collection = getCollection(item.belongs_to_collection);
  const library = getLibrary(item.images, item.videos, id, mediaType);

  return {
    id,
    name,
    fullDate: fullDate,
    yearDate: yearDate,
    posterPath: poster,
    backdropPath: backdrop,
    voteAverage: item.vote_average,
    description,
    tagline,
    mediaType: mediaType,
    runtime: runtimeContent,
    country,
    genres: genresList,
    certification,
    crew,
    contextColor: contextColorTheme,
    status,
    type,
    company,
    network,
    originalLanguage,
    budget,
    revenue,
    keywords,
    socials,
    chartColor,
    cast: topCast,
    recommendations,
    collection,
    library,
  };
};

export const normalizeCriticalMediaDetails = ({ details: item, releaseDates, contextColor }) => {
  const id = item.id;
  const date = item.release_date || item.first_air_date;
  const mediaType = item.media_type || (item.title ? "movie" : "tv");

  return {
    id,
    mediaType,
    name: item.title || item.name,
    yearDate: getYear(date),
    certification: getCertification(releaseDates, "US"),
    fullDate: formatDate(date),
    
    country: item.origin_country?.[0] 
      || String(item.original_language).toUpperCase()
      || "",

    runtime: formatRuntime(
      item.runtime || (Array.isArray(item.episode_run_time) ? item.episode_run_time[0] : null)
    ),

    genres: formatGenresList(item.genres?.map((g) => g.name) || []),
    voteAverage: item.vote_average,
    tagline: item.tagline || "",
    description: item.overview || "No description available",
    posterPath: item.poster_path || item.backdrop_path,
    backdropPath: item.backdrop_path || item.poster_path,
    
    contextColor: contextColor 
      ? rgbToHsl(normalizeColor(contextColor)) 
      : getColorFromId(id),
    isColorLoaded: !!contextColor,

    crew: getTopCrew(item, mediaType),
    cast: getTopCast(item.credits?.cast || []),
  };
};

export const normalizeContextMediaDetails = ({ details: item }) => {
  const id = item.id;
  const mediaType = item.media_type || (item.title ? "movie" : "tv");

  return {
    library: getLibrary(item.images, item.videos, id, mediaType),
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
    collection: getCollection(item.belongs_to_collection),
    recommendations: getRecommendations(item.recommendations),
    keywords: item.keywords?.keywords || item.keywords?.results || [],
    chartColor: buildRgb(contextColor) || "#0d253f",
  };
};
