import { fetchCollectionDetailsApi } from "@services";
import {
  fetchCollectionDetailsStart,
  fetchCollectionDetailsSuccess,
  fetchCollectionDetailsError,
  updateCollectionDetailsPartial,
} from "@actions";
import { 
  normalizeCriticalCollectionDetails, 
  normalizeContextCollectionDetails,
} from "@utils";
import { pipelineFetch } from "./model/pipelineFetch";

export const fetchCollectionDetails = ({ id }) => {
  return async (dispatch, getState) => {
    await pipelineFetch({
      dispatch,
      getState,

      checkCache: (state) => {
        const details = state.media.collectionDetails?.[id];
        return details?.loading || details?.isLoaded;
      },

      startAction: () => fetchCollectionDetailsStart(id),
      successAction: (data) => fetchCollectionDetailsSuccess(id, data),
      errorAction: (message) => fetchCollectionDetailsError(id, message),
      partialAction: (partialData) => updateCollectionDetailsPartial(id, partialData),

      fetchSource: () => fetchCollectionDetailsApi({ id }),
      
      normalizer: (response) => normalizeCriticalCollectionDetails(response),

      extraSteps: [
        async (response) => normalizeContextCollectionDetails(response),
      ],
    });
  };
};
