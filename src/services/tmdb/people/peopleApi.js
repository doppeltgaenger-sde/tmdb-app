import { apiClient } from "../instance";

export const fetchPeopleApi = async ({ page = 1 }) => {
  const endpoint = "/person/popular";

  const params = {
    language: "en-US",
    page,
  };

  try {
    const { data } = await apiClient.get(endpoint, { params });

    return {
      data: {
        peopleList: data?.results || [],
        totalPages: data?.total_pages || 0,
      }
    };
  } catch (error) {
    console.error(`[API] Error fetching people:`, error.message);
    throw error;
  }
};