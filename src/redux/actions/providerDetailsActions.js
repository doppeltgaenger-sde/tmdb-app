export const FETCH_PROVIDER_DETAILS_START = "PROVIDER/FETCH_DETAILS_START";
export const FETCH_PROVIDER_DETAILS_SUCCESS = "PROVIDER/FETCH_DETAILS_SUCCESS";
export const FETCH_PROVIDER_DETAILS_ERROR = "PROVIDER/FETCH_DETAILS_ERROR";

export const fetchProviderDetailsStart = (mediaType, id) => ({
  type: FETCH_PROVIDER_DETAILS_START,
  payload: { mediaType, id },
});

export const fetchProviderDetailsSuccess = (mediaType, id, data) => ({
  type: FETCH_PROVIDER_DETAILS_SUCCESS,
  payload: { mediaType, id, data },
});

export const fetchProviderDetailsError = (mediaType, id, error) => ({
  type: FETCH_PROVIDER_DETAILS_ERROR,
  payload: { mediaType, id, error },
});
