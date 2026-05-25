import { fetchPeopleApi } from "@services";
import {
  fetchPeopleStart,
  fetchPeopleSuccess,
  fetchPeopleError,
} from "@actions";
import { normalizePeopleData } from "@utils";
import { pipelineFetch } from "./model/pipelineFetch";

export const fetchPeople = ({ page = 1 }) => {
  return async (dispatch, getState) => {
    await pipelineFetch({
      dispatch,
      getState,

      checkCache: (state) => {
        const pageDetails = state.people.people?.[page];
        return pageDetails?.loading || pageDetails?.isLoaded;
      },

      startAction: () => fetchPeopleStart(page),
      successAction: (data) => fetchPeopleSuccess(page, data),
      errorAction: (message) => fetchPeopleError(page, message),
      fetchSource: () => fetchPeopleApi({ page }),
      normalizer: (response) => normalizePeopleData(response),
    });
  };
};
