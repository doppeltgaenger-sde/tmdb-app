import { fetchMediaApi } from "@services";
import {
  startGlobalLoading,
  stopGlobalLoading,
  setAppInitialized,
  fetchMediaTrackStart,
  fetchMediaTrackSuccess,
  fetchMediaTrackError,
} from "@actions";
import { normalizeMediaData } from "@utils";

export const fetchMediaTrack = (track, tab, page = 1) => {
  return async (dispatch, getState) => {
    const state = getState();
    const trackState = state.media.mediaTracks[track]?.[tab];
    const { isInitialized } = state.configuration;

    if (trackState?.loading) return;

    if (trackState?.isLoaded && page === 1) {
      return;
    }

    if (!isInitialized) {
      dispatch(startGlobalLoading());
    }

    try {
      dispatch(fetchMediaTrackStart(track, tab));

      const response = await fetchMediaApi({
        type: tab,
        category: track,
        page,
      });

      const results = response?.data?.results || [];
      const normalizedResults = results.map(normalizeMediaData);

      dispatch(fetchMediaTrackSuccess(track, tab, normalizedResults));
    } catch (error) {
      dispatch(fetchMediaTrackError(track, tab, error.message));
    } finally {
      if (!isInitialized) {
        dispatch(stopGlobalLoading());
        dispatch(setAppInitialized(true));
      }
    }
  };
};
