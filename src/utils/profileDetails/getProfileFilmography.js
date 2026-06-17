import { formatDate } from "@utils";

export const getProfileFilmography = (cast, crew) => {
  const map = new Map();

  const addEntry = (item, role) => {
    const id = item.id;
    const mediaType = item.media_type || (item.title ? "movie" : "tv");
    const name = item.title || item.name;
    const date = item.release_date || item.first_air_date || "";
    const poster = item.poster_path || item.backdrop_path;
    const backdrop = item.backdrop_path || item.poster_path;
    const description = item.overview || "No description available";
    
    if (!date) return;

    if (!map.has(id)) {
      map.set(id, {
        id,
        mediaType: mediaType,
        name: name,
        posterPath: poster,
        backdropPath: backdrop,
        date: date, 
        voteAverage: item.vote_average,
        roles: new Set(),
        episodesCount: item.episode_count || 0,
        description: description,
      });
    }
    map.get(id).roles.add(role);
  };

  if (cast) cast.forEach(item => addEntry(item, item.character ? `as ${item.character}` : "Actor"));
  if (crew) crew.forEach(item => addEntry(item, item.job));

  return Array.from(map.values())
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .reduce((acc, item) => {
      const year = item.date.split("-")[0];
      
      if (!acc[year]) acc[year] = [];
      
      acc[year].push({ 
        ...item,
        date: formatDate(item.date),
        roles: Array.from(item.roles).join(", ") 
      });
      
      return acc;
    }, {});
};
