import { apiClient } from "../instance";

export const fetchTrailer = async (id, mediaType = "movie") => {
  const response = await apiClient.get(`/${mediaType}/${id}/videos`);
  const videos = response.data.results;

  if (!videos?.length) return null;

  const trailer = videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );

  const teaser = videos.find(
    (video) => video.type === "Teaser" && video.site === "YouTube",
  );

  return trailer?.key || teaser?.key || null;
};
