export const START_GLOBAL_LOADING = "START_GLOBAL_LOADING";
export const STOP_GLOBAL_LOADING = "STOP_GLOBAL_LOADING";

export const startGlobalLoading = () => ({
  type: START_GLOBAL_LOADING,
});

export const stopGlobalLoading = () => ({
  type: STOP_GLOBAL_LOADING,
});
