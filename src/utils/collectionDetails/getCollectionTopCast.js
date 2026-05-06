export const getCollectionTopCast = (cast, limit = 20) => {
  if (!cast || !Array.isArray(cast)) return [];

  const actorMap = new Map();

  cast.forEach(actor => {
    if (!actorMap.has(actor.id) || actor.order < actorMap.get(actor.id).order) {
      actorMap.set(actor.id, {
        id: actor.id,
        name: actor.name,
        character: actor.character,
        profilePath: actor.profile_path,
        order: actor.order,
      });
    }
  });

  return Array.from(actorMap.values())
    .sort((a, b) => a.order - b.order)
    .slice(0, limit)
    .map(({ order, ...actorData }) => actorData);
};
