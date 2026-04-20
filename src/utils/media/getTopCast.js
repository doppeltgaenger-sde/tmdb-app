// utils/movieHelpers.js (или где у тебя лежат нормалайзеры)

export const getTopCast = (cast, limit = 20) => {
  if (!cast) return [];
  
  return cast
    .slice(0, limit)
    .map(person => ({
      id: person.id,
      name: person.name,
      character: person.character,
      profilePath: person.profile_path,
    }));
};
