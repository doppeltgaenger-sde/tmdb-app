import { fetchMediaDetailsApi } from "@services";
import {
  fetchMediaDetailsStart,
  fetchMediaDetailsSuccess,
  fetchMediaDetailsError,
  updateMediaDetailsPartial,
} from "@actions";
import { 
  normalizeCriticalMediaDetails, 
  normalizeContextMediaDetails,
  normalizeExtendedMediaDetails,
} from "@utils";
import { pipelineFetch } from "./model/pipelineFetch";

export const fetchMediaDetails = ({ mediaType, id }) => {
  return async (dispatch, getState) => {
    await pipelineFetch({
      dispatch,
      getState,

      checkCache: (state) => {
        const details = state.mediaDetails.mediaDetails?.[mediaType]?.[id];
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
    const detailsState = state.mediaDetails.mediaDetails?.[mediaType]?.[id];
    
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
