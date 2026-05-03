import {
  FETCH_MEDIA_DETAILS_START,
  FETCH_MEDIA_DETAILS_SUCCESS,
  FETCH_MEDIA_DETAILS_ERROR,
  UPDATE_MEDIA_DETAILS_PARTIAL,
} from "@actions";

const initialState = {
  mediaDetails: {
    movie: {},
    tv: {},
  },
};

export const mediaDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEDIA_DETAILS_START: {
      const { mediaType, id } = action.payload;
      const prevState = state.mediaDetails[mediaType]?.[id];
      return {
        ...state,
        mediaDetails: {
          ...state.mediaDetails,
          [mediaType]: {
            ...state.mediaDetails[mediaType],
            [id]: {
              data: prevState?.data || null,
              loading: true,
              error: null,
              isLoaded: prevState?.isLoaded || false,
            },
          },
        },
      };
    }

    case FETCH_MEDIA_DETAILS_SUCCESS: {
      const { mediaType, id, data } = action.payload;
      return {
        ...state,
        mediaDetails: {
          ...state.mediaDetails,
          [mediaType]: {
            ...state.mediaDetails[mediaType],
            [id]: {
              data,
              loading: false,
              error: null,
              isLoaded: true,
            },
          },
        },
      };
    }

    case FETCH_MEDIA_DETAILS_ERROR: {
      const { mediaType, id, error } = action.payload;
      return {
        ...state,
        mediaDetails: {
          ...state.mediaDetails,
          [mediaType]: {
            ...state.mediaDetails[mediaType],
            [id]: {
              data: null,
              loading: false,
              error,
              isLoaded: true,
            },
          },
        },
      };
    }

    case UPDATE_MEDIA_DETAILS_PARTIAL: {
      const { mediaType, id, partialData } = action.payload;
      const currentMedia = state.mediaDetails[mediaType]?.[id];

      if (!currentMedia || !currentMedia.data) return state;

      return {
        ...state,
        mediaDetails: {
          ...state.mediaDetails,
          [mediaType]: {
            ...state.mediaDetails[mediaType],
            [id]: {
              ...currentMedia,
              data: {
                ...currentMedia.data,
                ...partialData,
              },
            },
          },
        },
      };
    }

    default:
      return state;
  }
};
