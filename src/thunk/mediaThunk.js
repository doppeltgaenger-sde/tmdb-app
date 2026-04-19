import { fetchMediaApi, fetchMediaDetailsApi } from "@services";
import {
  startGlobalLoading,
  stopGlobalLoading,
  setAppInitialized,
} from "@actions/appActions";
import {
  fetchMediaTrackStart,
  fetchMediaTrackSuccess,
  fetchMediaTrackError,
  fetchMediaDetailsStart,
  fetchMediaDetailsSuccess,
  fetchMediaDetailsError,
} from "@actions/mediaActions";
import { normalizeMediaData, normalizeMediaDetails } from "@utils";

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
      if (!isAppInitialized) {
        dispatch(stopGlobalLoading());
        dispatch(setAppInitialized(true));
      }
    }
  };
};

export const fetchMediaDetails = ({ mediaType, id }) => {
  return async (dispatch, getState) => {
    const state = getState();
    const detailsState = state.media.mediaDetails?.[mediaType]?.[id];

    if (detailsState?.loading) return;
    if (detailsState?.data) return;

    try {
      dispatch(fetchMediaDetailsStart(mediaType, id));

      const response = await fetchMediaDetailsApi({
        mediaType,
        id,
      });

      const data = normalizeMediaDetails(response);

      dispatch(fetchMediaDetailsSuccess(mediaType, id, data));
    } catch (error) {
      dispatch(fetchMediaDetailsError(mediaType, id, error.message));
    }
  };
};
