import { attachMediaType } from "@utils";
import { apiClient } from "../instance";

export const fetchProviderDetailsApi = async ({ id, mediaType = "movie", page = 1 }) => {
  const endpointKey = mediaType === "movie" ? "company" : "network";
  const queryKey = mediaType === "movie" ? "with_companies" : "with_networks";
  const endpoint = `/${endpointKey}/${id}`;

  try {
    const { data: details } = await apiClient.get(endpoint);

    const providerMedia = await apiClient.get(`/discover/${mediaType}`, {
      params: {
        [queryKey]: id,
        page,
        sort_by: "popularity.desc",
      },
    }).then(res => res.data);

    console.log({
      ...details,
      mediaType,
      providerMedia: attachMediaType(providerMedia.results, mediaType) || [],
      page: providerMedia.page,
      totalPages: providerMedia.total_pages || 0,
      totalResults: providerMedia.total_results || 0,
    });

    return {
      details: {
        ...details,
        mediaType,
        providerMedia: attachMediaType(providerMedia.results, mediaType) || [],
        page: providerMedia.page,
        totalPages: providerMedia.total_pages || 0,
        totalResults: providerMedia.total_results || 0,
      },
    };
  } catch (error) {
    console.error(`[API] Error fetching ${endpointKey} details:`, error.message);
    throw error;
  }
};
