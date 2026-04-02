export const attachMediaType = (results, mediaType) => {
  return results.map((item) => ({
    ...item,
    media_type: mediaType,
  }));
};
