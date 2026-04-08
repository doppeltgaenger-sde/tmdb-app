export const FETCH_MEDIA_TRACK_START = "FETCH_MEDIA_TRACK_START";
export const FETCH_MEDIA_TRACK_SUCCESS = "FETCH_MEDIA_TRACK_SUCCESS";
export const FETCH_MEDIA_TRACK_ERROR = "FETCH_MEDIA_TRACK_ERROR";

export const fetchMediaTrackStart = (track, tab) => ({
  type: FETCH_MEDIA_TRACK_START,
  payload: { track, tab },
});

export const fetchMediaTrackSuccess = (track, tab, data) => ({
  type: FETCH_MEDIA_TRACK_SUCCESS,
  payload: { track, tab, data },
});

export const fetchMediaTrackError = (track, tab, error) => ({
  type: FETCH_MEDIA_TRACK_ERROR,
  payload: { track, tab, error },
});

export const FETCH_MEDIA_DETAILS_START = "FETCH_MEDIA_DETAILS_START";
export const FETCH_MEDIA_DETAILS_SUCCESS = "FETCH_MEDIA_DETAILS_SUCCESS";
export const FETCH_MEDIA_DETAILS_ERROR = "FETCH_MEDIA_DETAILS_ERROR";

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
