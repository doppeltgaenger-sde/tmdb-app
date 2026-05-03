export const FETCH_COLLECTION_DETAILS_START = "COLLECTION/FETCH_DETAILS_START";
export const FETCH_COLLECTION_DETAILS_SUCCESS = "COLLECTION/FETCH_DETAILS_SUCCESS";
export const FETCH_COLLECTION_DETAILS_ERROR = "COLLECTION/FETCH_DETAILS_ERROR";
export const UPDATE_COLLECTION_DETAILS_PARTIAL = "COLLECTION/UPDATE_DETAILS_PARTIAL";

export const fetchCollectionDetailsStart = (id) => ({
  type: FETCH_COLLECTION_DETAILS_START,
  payload: { id },
});

export const fetchCollectionDetailsSuccess = (id, data) => ({
  type: FETCH_COLLECTION_DETAILS_SUCCESS,
  payload: { id, data },
});

export const fetchCollectionDetailsError = (id, error) => ({
  type: FETCH_COLLECTION_DETAILS_ERROR,
  payload: { id, error },
});

export const updateCollectionDetailsPartial = (id, partialData) => ({
  type: UPDATE_COLLECTION_DETAILS_PARTIAL,
  payload: { id, partialData },
});
