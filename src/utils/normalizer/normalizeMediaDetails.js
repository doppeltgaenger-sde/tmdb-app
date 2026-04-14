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
} from "@utils";

export const normalizeMediaDetails = ({ details: item, release_dates, overlay }) => {
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

  const certification = getCertification(release_dates, "US");
  const crew = item.credits?.crew || [];
  const topCrew = getTopCrew(crew);

  const overlayTheme = overlay 
    ? rgbToHsl(normalizeColor(overlay)) 
    : getColorFromId(item.id);

  const originalLanguage = formatFullLanguage(item.original_language);
  const budget = formatCurrency(item.budget) || "–";
  const revenue = formatCurrency(item.revenue) || "–";
  const keywords =  item.keywords?.keywords || [];
  const socials = formatSocials(item.external_ids, item.homepage);

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
    overlay: overlayTheme,
    status: item.status,
    originalLanguage,
    budget,
    revenue,
    keywords,
    socials,
  };
};