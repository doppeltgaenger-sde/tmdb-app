import { apiClient } from "../instance";

export const configurationApi = {
  getMovieGenres: (language = "en-US") => {
    return apiClient.get("/genre/movie/list", {
      params: { language }
    });
  },
};
