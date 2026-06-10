import { apiClient } from "../instance";

export const fetchProfileDetailsApi = async ({ id }) => {
  const endpoint = `/person/${id}`;

  const params = { 
    append_to_response: "external_ids,combined_credits" 
  };

  try {
    const { data: details } = await apiClient.get(endpoint, { params });

    return {
      details: {
        ...details,
      },
    };
  } catch (error) {
    console.error("[API] Error fetching profile details:", error.message);
    throw error;
  }
};
