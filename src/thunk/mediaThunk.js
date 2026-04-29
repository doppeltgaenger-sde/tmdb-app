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
  updateMediaDetailsPartial,
} from "@actions/mediaActions";
import { 
  normalizeMediaData, 
  normalizeCriticalMediaDetails, 
  normalizeContextMediaDetails,
  normalizeExtendedMediaDetails,
} from "@utils";
import { pipelineFetch } from "./model/pipelineFetch";

export const fetchMediaTrack = (track, tab, page = 1) => {
  return async (dispatch, getState) => {
    const state = getState();
    const trackState = state.media.mediaTracks[track]?.[tab];
    const { isInitialized } = state.app;

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

export const fetchMediaDetails = ({ mediaType, id }) => {
  return async (dispatch, getState) => {
    await pipelineFetch({
      dispatch,
      getState,

      checkCache: (state) => {
        const details = state.media.mediaDetails?.[mediaType]?.[id];
        return details?.loading || details?.isLoaded;
      },

      startAction: () => fetchMediaDetailsStart(mediaType, id),
      successAction: (data) => fetchMediaDetailsSuccess(mediaType, id, data),
      errorAction: (message) => fetchMediaDetailsError(mediaType, id, message),
      partialAction: (partialData) => updateMediaDetailsPartial(mediaType, id, partialData),

      fetchSource: () => fetchMediaDetailsApi({ mediaType, id }),
      
      normalizer: (response) => normalizeCriticalMediaDetails(response),

      extraSteps: [
        async (response) => normalizeContextMediaDetails(response),
      ],
    });
  };
};

export const fetchMediaDetailsExtended = ({ mediaType, id }) => {
  return async (dispatch, getState) => {
    const state = getState();
    const detailsState = state.media.mediaDetails?.[mediaType]?.[id];
    
    if (!detailsState?.data) return;

    if (detailsState.data.recommendations?.length > 0) return;

    try {
      const response = await fetchMediaDetailsApi({ mediaType, id });
      const extendedData = normalizeExtendedMediaDetails(response);

      dispatch(updateMediaDetailsPartial(mediaType, id, extendedData));
    } catch (error) {
      console.error(`[Lazy Extended Load Error]:`, error.message);
    }
  };
};
