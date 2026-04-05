import {
  START_GLOBAL_LOADING,
  STOP_GLOBAL_LOADING,
  SET_APP_INITIALIZED,
} from "@actions/appActions";

const initialState = {
  loadingCount: 0,
  isAppInitialized: false,
};

export const appReducer = (state = initialState, action) => {
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
        isAppInitialized: action.payload,
      };

    default:
      return state;
  }
};
