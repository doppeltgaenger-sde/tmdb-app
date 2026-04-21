export const getTopCast = (cast, limit = 20) => {
  if (!cast) return [];
  
  return cast
    .slice(0, limit)
    .map(item => ({
      id: item.id,
      name: item.name,
      character: item.character,
      profilePath: item.profile_path,
    }));
};
