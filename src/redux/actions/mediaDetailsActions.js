export const FETCH_MEDIA_DETAILS_START = "MEDIA/FETCH_DETAILS_START";
export const FETCH_MEDIA_DETAILS_SUCCESS = "MEDIA/FETCH_DETAILS_SUCCESS";
export const FETCH_MEDIA_DETAILS_ERROR = "MEDIA/FETCH_DETAILS_ERROR";
export const UPDATE_MEDIA_DETAILS_PARTIAL = "MEDIA/UPDATE_DETAILS_PARTIAL";

export const fetchMediaDetailsStart = (mediaType, id) => ({
  type: FETCH_MEDIA_DETAILS_START,
  payload: { mediaType, id },
});

export const fetchMediaDetailsSuccess = (mediaType, id, data) => ({
  type: FETCH_MEDIA_DETAILS_SUCCESS,
  payload: { mediaType, id, data },
});

export const fetchMediaDetailsError = (mediaType, id, error) => ({
  type: FETCH_MEDIA_DETAILS_ERROR,
  payload: { mediaType, id, error },
});

export const updateMediaDetailsPartial = (mediaType, id, partialData) => ({
  type: UPDATE_MEDIA_DETAILS_PARTIAL,
  payload: { mediaType, id, partialData },
});
