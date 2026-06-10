import { fetchProfileDetailsApi } from "@services";
import {
  fetchProfileDetailsStart,
  fetchProfileDetailsSuccess,
  fetchProfileDetailsError,
  updateProfileDetailsPartial,
} from "@actions";
import { 
  normalizeCriticalProfileDetails, 
  normalizeContextProfileDetails,
  normalizeExtendedMediaDetails,
} from "@utils";
import { pipelineFetch } from "./model/pipelineFetch";

export const fetchProfileDetails = ({ id }) => {
  return async (dispatch, getState) => {
    await pipelineFetch({
      dispatch,
      getState,

      checkCache: (state) => {
        const details = state.profileDetails.profileDetails?.[id];
        return details?.loading || details?.isLoaded;
      },

      startAction: () => fetchProfileDetailsStart(id),
      successAction: (data) => fetchProfileDetailsSuccess(id, data),
      errorAction: (message) => fetchProfileDetailsError(id, message),
      partialAction: (partialData) => updateProfileDetailsPartial(id, partialData),
      fetchSource: () => fetchProfileDetailsApi({ id }),
      normalizer: (response) => normalizeCriticalProfileDetails(response),

      extraSteps: [
        (response) => normalizeContextProfileDetails(response),
        // (response) => normalizeExtendedMediaDetails(response),
      ],
    });
  };
};
