import { apiClient } from "../instance";

const VIDEO_TYPE = {
  TRAILER: "Trailer",
  TEASER: "Teaser",
};

const VIDEO_SOURCE = {
  YOUTUBE: "YouTube",
};

export const fetchTrailer = async (id, mediaType = "movie") => {
  try {
    const { data } = await apiClient.get(`/${mediaType}/${id}/videos`);
    const videos = data?.results;

    if (!videos?.length) return null;

    const trailer = videos.find(
      (video) => video.type === VIDEO_TYPE.TRAILER && video.site === VIDEO_SOURCE.YOUTUBE
    );

    const teaser = videos.find(
      (video) => video.type === VIDEO_TYPE.TEASER && video.site === VIDEO_SOURCE.YOUTUBE
    );

    return trailer?.key || teaser?.key || null;
  } catch (error) {
      console.error(`[API] Error fetching trailer key for ${mediaType} ${id}:`, error.message);
    return null;
  }
};
