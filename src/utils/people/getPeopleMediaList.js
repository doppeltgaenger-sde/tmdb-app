export const getPeopleMediaList = (mediaList) => {
  if (!mediaList) return [];

  return mediaList
    .map((media) => media.title || media.name || media.original_title)
    .filter(Boolean)
    .join(", ");
};
