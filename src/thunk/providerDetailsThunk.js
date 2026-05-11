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
        const details = state.providerDetails.providerDetails?.[mediaType]?.[id];
        
        if (details?.loading) return true;

        const isSamePage = details?.data?.page === page;

        return details?.isLoaded && isSamePage;
      },

      startAction: () => fetchProviderDetailsStart(mediaType, id),
      successAction: (data) => fetchProviderDetailsSuccess(mediaType, id, data),
      errorAction: (message) => fetchProviderDetailsError(mediaType, id, message),
      
      fetchSource: () => {
        const discoverType = mediaType === "company" ? "movie" : "tv";
        return fetchProviderDetailsApi({ id, mediaType: discoverType, page });
      },
      
      normalizer: (response) => normalizeProviderDetails(response),
    });
  };
};
