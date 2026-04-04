import { fetchMedia } from "@api";
import { startGlobalLoading, stopGlobalLoading } from "@actions/appActions";
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

    if (trackState?.isLoaded && page === 1) {
      return;
    }

    dispatch(startGlobalLoading());

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
      dispatch(stopGlobalLoading());
    }
  };
};
