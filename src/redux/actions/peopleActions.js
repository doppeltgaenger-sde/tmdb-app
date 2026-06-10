export const FETCH_PEOPLE_START = "PEOPLE/FETCH_START";
export const FETCH_PEOPLE_SUCCESS = "PEOPLE/FETCH_SUCCESS";
export const FETCH_PEOPLE_ERROR = "PEOPLE/FETCH_ERROR";

export const fetchPeopleStart = (page) => ({
  type: FETCH_PEOPLE_START,
  payload: { page },
});

export const fetchPeopleSuccess = (page, data) => ({
  type: FETCH_PEOPLE_SUCCESS,
  payload: { data, page },
});

export const fetchPeopleError = (page, error) => ({
  type: FETCH_PEOPLE_ERROR,
  payload: { page, error },
});
