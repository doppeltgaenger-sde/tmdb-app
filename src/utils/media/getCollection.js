export const getCollection = (collection) => {
  if (!collection) return null;

  return {
    id: collection.id,
    name: collection.name.replace(/collection/gi, "").trim(),
    backdropPath: collection.backdrop_path || collection.poster_path,
  };
};
