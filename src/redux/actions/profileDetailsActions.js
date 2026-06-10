export const FETCH_PROFILE_DETAILS_START = "PROFILE/FETCH_DETAILS_START";
export const FETCH_PROFILE_DETAILS_SUCCESS = "PROFILE/FETCH_DETAILS_SUCCESS";
export const FETCH_PROFILE_DETAILS_ERROR = "PROFILE/FETCH_DETAILS_ERROR";
export const UPDATE_PROFILE_DETAILS_PARTIAL = "PROFILE/UPDATE_DETAILS_PARTIAL";

export const fetchProfileDetailsStart = (id) => ({
  type: FETCH_PROFILE_DETAILS_START,
  payload: { id },
});

export const fetchProfileDetailsSuccess = (id, data) => ({
  type: FETCH_PROFILE_DETAILS_SUCCESS,
  payload: { id, data },
});

export const fetchProfileDetailsError = (id, error) => ({
  type: FETCH_PROFILE_DETAILS_ERROR,
  payload: { id, error },
});

export const updateProfileDetailsPartial = (id, partialData) => ({
  type: UPDATE_PROFILE_DETAILS_PARTIAL,
  payload: { id, partialData },
});
