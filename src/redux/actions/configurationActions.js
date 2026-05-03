export const START_GLOBAL_LOADING = "APP/START_LOADING";
export const STOP_GLOBAL_LOADING = "APP/STOP_LOADING";
export const SET_APP_INITIALIZED = "APP/SET_INITIALIZED";
export const SET_GENRES = "APP/SET_GENRES";

export const startGlobalLoading = () => ({
  type: START_GLOBAL_LOADING,
});

export const stopGlobalLoading = () => ({
  type: STOP_GLOBAL_LOADING,
});

export const setAppInitialized = (isInitialized) => ({
  type: SET_APP_INITIALIZED,
  payload: isInitialized,
});

export const setGenres = (genres) => ({
  type: SET_GENRES,
  payload: genres,
});
