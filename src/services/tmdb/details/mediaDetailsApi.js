import { apiClient } from "../instance";

export const fetchMediaDetailsApi = async ({ mediaType, id }) => {
  const endpoint = `/${mediaType}/${id}`;
  const releaseKey = mediaType === "tv" ? "content_ratings" : "release_dates";

  const params = { 
    append_to_response: `videos,images,credits,recommendations,keywords,external_ids,${releaseKey}` 
  };

  try {
    const { data: details } = await apiClient.get(endpoint, { params });
    const posterUrl = `https://image.tmdb.org/t/p/w45${details.poster_path}`;

    const [contextColor] = await Promise.all([
      fetch(`/api/color?url=${encodeURIComponent(posterUrl)}`)
        .then(res => res.ok ? res.json() : null)
        .catch(() => null)
    ]);

    console.log(details);

    return {
      details: {
        ...details,
        contextColor: contextColor || { r: 20, g: 20, b: 20 },
      },
    };
  } catch (error) {
      console.error(`[API] Error fetching ${mediaType} details:`, error.message);
    throw error;
  }
};
