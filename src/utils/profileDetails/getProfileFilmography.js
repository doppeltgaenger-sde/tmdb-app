import { formatDate } from "@utils";

export const getProfileFilmography = (cast, crew) => {
  const map = new Map();

  const addEntry = (item, role) => {
    const id = item.id;
    const date = item.release_date || item.first_air_date || "";
    
    if (!date) return;

    if (!map.has(id)) {
      map.set(id, {
        id,
        name: item.title || item.name,
        date: date, 
        voteAverage: item.vote_average || 0,
        mediaType: item.media_type || (item.title ? "movie" : "tv"),
        roles: new Set(),
        episodesCount: item.episode_count || 0
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
