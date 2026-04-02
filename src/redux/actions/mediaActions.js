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
