import { fetchMedia } from "@api";
import {
  startGlobalLoading,
  stopGlobalLoading,
  setAppInitialized,
} from "@actions/appActions";
import {
  fetchMediaTrackStart,
  fetchMediaTrackSuccess,
  fetchMediaTrackError,
} from "@actions/mediaActions";
import { normalizeMediaData } from "@utils";

export const fetchMediaTrack = (track, tab, page = 1) => {
  return async (dispatch, getState) => {
    const state = getState();
    const trackState = state.media.mediaTracks[track]?.[tab];
    const { isAppInitialized } = state.app;

    if (trackState?.loading) return;

    if (trackState?.isLoaded && page === 1) {
      return;
    }

    if (!isAppInitialized) {
      dispatch(startGlobalLoading());
    }

    try {
      dispatch(fetchMediaTrackStart(track, tab));

      const response = await fetchMedia({
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
      if (!isAppInitialized) {
        dispatch(stopGlobalLoading());
        dispatch(setAppInitialized(true));
      }
    }
  };
};
