import { fetchProviderDetailsApi } from "@services";
import {
  fetchProviderDetailsStart,
  fetchProviderDetailsSuccess,
  fetchProviderDetailsError,
} from "@actions";
import { normalizeProviderDetails } from "@utils";
import { pipelineFetch } from "./model/pipelineFetch";

export const fetchProviderDetails = ({ mediaType, id, page = 1 }) => {
  return async (dispatch, getState) => {
    await pipelineFetch({
      dispatch,
      getState,

      checkCache: (state) => {
        if (page > 1) return false;

        const details = state.providerDetails.providerDetails?.[mediaType]?.[id];
        return details?.loading || (details?.isLoaded && !!details?.data);
      },

      startAction: page === 1 
        ? () => fetchProviderDetailsStart(mediaType, id) 
        : null,

      successAction: (data) => fetchProviderDetailsSuccess(mediaType, id, data),
      errorAction: (message) => fetchProviderDetailsError(mediaType, id, message),
      partialAction: null,

      fetchSource: () => {
        const discoverType = mediaType === "company" ? "movie" : "tv";
        return fetchProviderDetailsApi({ id, mediaType: discoverType, page });
      },
      
      normalizer: (response) => normalizeProviderDetails(response),
      extraSteps: [],
    });
  };
};
