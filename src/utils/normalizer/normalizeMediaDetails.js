import { 
  getCertification, 
  getTopCrew, 
  normalizeColor, 
  rgbToHsl, 
  getColorFromId 
} from "@utils";

export const normalizeMediaDetails = ({ details: item, release_dates, overlay }) => {
  const name = item.title || item.name;
  const date = item.release_date || item.first_air_date;
  const poster = item.poster_path || item.backdrop_path;
  const backdrop = item.backdrop_path || item.poster_path;
  const description = item.overview || "No description available";
  const mediaType = item.media_type || (item.title ? "movie" : "tv");

  const runtime =
    item.runtime ||
    (Array.isArray(item.episode_run_time) ? item.episode_run_time[0] : null);

  const genres = item.genres?.map((g) => g.name) || [];
  const certification = getCertification(release_dates, "US");
  const crew = item.credits?.crew || [];
  const topCrew = getTopCrew(crew);

  const overlayTheme = overlay 
    ? rgbToHsl(normalizeColor(overlay)) 
    : getColorFromId(item.id);

  return {
    id: item.id,
    name,
    date,
    poster_path: poster,
    backdrop_path: backdrop,
    vote_average: item.vote_average,
    vote_count: item.vote_count,
    description,
    tagline: item.tagline || "",
    runtime,
    genres,
    media_type: mediaType,
    certification,
    crew: topCrew,
    overlay: overlayTheme,
  };
};