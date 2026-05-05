import { apiClient } from "../instance";

export const fetchCollectionDetailsApi = async ({ id }) => {
  const endpoint = `/collection/${id}`;

  try {
    const { data: details } = await apiClient.get(endpoint);
    const posterUrl = `https://image.tmdb.org/t/p/w45${details.poster_path}`;

    const [partsCredits, contextColor] = await Promise.all([
      Promise.all(
        details.parts.map(movie => 
          apiClient.get(`/movie/${movie.id}/credits`)
            .then(res => res.data)
            .catch(() => ({ cast: [], crew: [] }))
        )
      ),
      fetch(`/api/color?url=${encodeURIComponent(posterUrl)}`)
        .then(res => res.ok ? res.json() : null)
        .catch(() => null)
    ]);

    console.log({...details, partsCredits});
    

    return {
      details: {
        ...details,
        credits: {
          cast: partsCredits.flatMap(p => p.cast),
          crew: partsCredits.flatMap(p => p.crew)
        }
      },
      contextColor: contextColor || { r: 20, g: 20, b: 20 },
    };
  } catch (error) {
    console.error(`[API] Error fetching collection details:`, error.message);
    throw error;
  }
};
