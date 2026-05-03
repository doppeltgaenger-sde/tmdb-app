import { apiClient } from "../instance";

export const fetchReleaseDates = async (id, mediaType = "movie") => {
  const endpoint =
    mediaType === "tv"
      ? `/${mediaType}/${id}/content_ratings`
      : `/${mediaType}/${id}/release_dates`;

  const response = await apiClient.get(endpoint);

  return response.data.results || [];
};

export const fetchMediaDetailsApi = async ({ mediaType, id }) => {
  const endpoint = `/${mediaType}/${id}`;
  const params = { append_to_response: "videos,images,credits,recommendations,keywords,external_ids" };

  try {
    const { data: details } = await apiClient.get(endpoint, { params });
    const posterUrl = `https://image.tmdb.org/t/p/w45${details.poster_path}`;

    const [releaseDates, contextColor] = await Promise.all([
      fetchReleaseDates(id, mediaType),
      fetch(`/api/color?url=${encodeURIComponent(posterUrl)}`)
        .then(res => res.ok ? res.json() : null)
        .catch(() => null)
    ]);

    console.log(details);

    return {
      details,
      releaseDates: releaseDates,
      contextColor: contextColor || { r: 20, g: 20, b: 20 },
    };
  } catch (error) {
      console.error(`[API] Error fetching ${mediaType} details:`, error.message);
    throw error;
  }
};
