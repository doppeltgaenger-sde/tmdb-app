import { START_GLOBAL_LOADING, STOP_GLOBAL_LOADING } from "@actions/appActions";

const initialState = {
  loadingCount: 0,
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

    default:
      return state;
  }
};
