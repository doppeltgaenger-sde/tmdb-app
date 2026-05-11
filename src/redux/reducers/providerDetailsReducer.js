import {
  FETCH_PROVIDER_DETAILS_START,
  FETCH_PROVIDER_DETAILS_SUCCESS,
  FETCH_PROVIDER_DETAILS_ERROR,
} from "@actions";

const initialState = {
  providerDetails: {
    company: {},
    network: {},
  },
};

export const providerDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROVIDER_DETAILS_START: {
      const { mediaType, id } = action.payload;
      const prevState = state.providerDetails[mediaType]?.[id];

      return {
        ...state,
        providerDetails: {
          ...state.providerDetails,
          [mediaType]: {
            ...state.providerDetails[mediaType],
            [id]: {
              ...prevState,
              loading: true,
              isLoaded: prevState?.isLoaded || false,
              error: null,
            },
          },
        },
      };
    }

    case FETCH_PROVIDER_DETAILS_SUCCESS: {
      const { mediaType, id, data } = action.payload;

      return {
        ...state,
        providerDetails: {
          ...state.providerDetails,
          [mediaType]: {
            ...state.providerDetails[mediaType],
            [id]: {
              data: {
                ...data,
              },
              loading: false,
              isLoaded: true,
              error: null,
            },
          },
        },
      };
    }

    case FETCH_PROVIDER_DETAILS_ERROR: {
      const { mediaType, id, error } = action.payload;

      return {
        ...state,
        providerDetails: {
          ...state.providerDetails,
          [mediaType]: {
            ...state.providerDetails[mediaType],
            [id]: {
              ...state.providerDetails[mediaType][id],
              loading: false,
              error,
              isLoaded: true,
            },
          },
        },
      };
    }

    default:
      return state;
  }
};
