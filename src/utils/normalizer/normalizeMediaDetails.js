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
  buildFill,
  getTopCast,
  getRecommendations,
} from "@utils";

export const normalizeMediaDetails = ({ details: item, releaseDates, contextColor }) => {
  const name = item.title || item.name;

  const date = item.releaseDates || item.first_air_date;
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
  const crew = item.credits?.crew || [];
  const topCrew = getTopCrew(crew);

  const contextColorTheme = contextColor 
    ? rgbToHsl(normalizeColor(contextColor)) 
    : getColorFromId(item.id);

  const originalLanguage = formatFullLanguage(item.original_language);
  const budget = formatCurrency(item.budget) || "–";
  const revenue = formatCurrency(item.revenue) || "–";
  const keywords =  item.keywords?.keywords || [];
  const socials = formatSocials(item.external_ids, item.homepage);
  const chartColor = buildFill(contextColor) || "#0d253f";
  const cast = item.credits?.cast || [];
  const topCast = getTopCast(cast);
  const recommendations = getRecommendations(item.recommendations);

  return {
    id: item.id,
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
    crew: topCrew,
    contextColor: contextColorTheme,
    status: item.status,
    originalLanguage,
    budget,
    revenue,
    keywords,
    socials,
    chartColor,
    cast: topCast,
    recommendations,
  };
};