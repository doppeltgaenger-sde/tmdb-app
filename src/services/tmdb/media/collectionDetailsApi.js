import { apiClient } from "../instance";

export const fetchCollectionDetailsApi = async ({ id }) => {
  const endpoint = `/collection/${id}`;

  try {
    const { data: details } = await apiClient.get(endpoint);
    const posterUrl = `https://image.tmdb.org/t/p/w45${details.poster_path}`;

    const [contextColor] = await Promise.all([
      fetch(`/api/color?url=${encodeURIComponent(posterUrl)}`)
        .then(res => res.ok ? res.json() : null)
        .catch(() => null)
    ]);

    console.log(details);

    return {
      details,
      contextColor: contextColor || { r: 20, g: 20, b: 20 },
    };
  } catch (error) {
      console.error(`[API] Error fetching collection details:`, error.message);
    throw error;
  }
};
