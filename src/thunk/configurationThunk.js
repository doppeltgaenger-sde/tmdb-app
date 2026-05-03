import { configurationApi } from "@services";
import { setAppInitialized, setGenres } from "@actions";

export const initAppConfiguration = () => async (dispatch) => {
  try {
    const response = await configurationApi.getMovieGenres();
    const genres = response?.data?.genres || [];

    const genresMap = genres.reduce((acc, g) => {
      acc[g.id] = g.name;
      return acc;
    }, {});

    dispatch(setGenres(genresMap));
  } catch (error) {
    console.error("Silent genres fetch failed:", error);
  } finally {
    dispatch(setAppInitialized(true));
  }
};
