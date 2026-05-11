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
        (response) => normalizeContextMediaDetails(response),
        (response) => normalizeExtendedMediaDetails(response),
      ],
    });
  };
};
