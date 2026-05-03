import {
  START_GLOBAL_LOADING,
  STOP_GLOBAL_LOADING,
  SET_APP_INITIALIZED,
  SET_GENRES,
} from "@actions";

const initialState = {
  loadingCount: 0,
  isInitialized: false,
  genres: {},
};

export const configurationReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_GLOBAL_LOADING:
      return {
        ...state,
        loadingCount: state.loadingCount + 1,
      };

    case STOP_GLOBAL_LOADING:
      return {
        ...state,
        loadingCount: Math.max(0, state.loadingCount - 1),
      };

    case SET_APP_INITIALIZED:
      return {
        ...state,
        isInitialized: action.payload,
      };

    case SET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    default:
      return state;
  }
};
