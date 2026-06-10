import {
  FETCH_PROFILE_DETAILS_START,
  FETCH_PROFILE_DETAILS_SUCCESS,
  FETCH_PROFILE_DETAILS_ERROR,
  UPDATE_PROFILE_DETAILS_PARTIAL,
} from "@actions";

const initialState = {
  profileDetails: {},
};

export const profileDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_DETAILS_START: {
      const { id } = action.payload;
      const prevState = state.profileDetails?.[id];

      return {
        ...state,
        profileDetails: {
          ...state.profileDetails,
          [id]: {
            data: prevState?.data || null,
            loading: true,
            error: null,
            isLoaded: prevState?.isLoaded || false,
          },
        },
      };
    }

    case FETCH_PROFILE_DETAILS_SUCCESS: {
      const { id, data } = action.payload;
      const prevState = state.profileDetails?.[id];

      return {
        ...state,
        profileDetails: {
          ...state.profileDetails,
          [id]: {
            ...prevState,
            data,
            loading: false,
            error: null,
            isLoaded: true,
          },
        },
      };
    }

    case FETCH_PROFILE_DETAILS_ERROR: {
      const { id, error } = action.payload;
      const prevState = state.profileDetails?.[id];

      return {
        ...state,
        profileDetails: {
          ...state.profileDetails,
          [id]: {
            data: prevState?.data || null,
            loading: false,
            error,
            isLoaded: prevState?.isLoaded || false,
          },
        },
      };
    }

    case UPDATE_PROFILE_DETAILS_PARTIAL: {
      const { id, partialData } = action.payload;
      const currentProfile = state.profileDetails?.[id];

      if (!currentProfile || !currentProfile.data) return state;

      return {
        ...state,
        profileDetails: {
          ...state.profileDetails,
          [id]: {
            ...currentProfile,
            data: {
              ...currentProfile.data,
              ...partialData,
            },
          },
        },
      };
    }

    default:
      return state;
  }
};
