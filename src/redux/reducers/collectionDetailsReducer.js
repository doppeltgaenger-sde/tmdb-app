import {
  FETCH_COLLECTION_DETAILS_START,
  FETCH_COLLECTION_DETAILS_SUCCESS,
  FETCH_COLLECTION_DETAILS_ERROR,
  UPDATE_COLLECTION_DETAILS_PARTIAL,
} from "@actions";

const initialState = {
  collectionDetails: {},
};

export const collectionDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COLLECTION_DETAILS_START: {
      const { id } = action.payload;
      const prevState = state.collectionDetails?.[id];
      return {
        ...state,
        collectionDetails: {
          ...state.collectionDetails,
          [id]: {
            data: prevState?.data || null,
            loading: true,
            error: null,
            isLoaded: prevState?.isLoaded || false,
          },
        },
      };
    }

    case FETCH_COLLECTION_DETAILS_SUCCESS: {
      const { id, data } = action.payload;
      return {
        ...state,
        collectionDetails: {
          ...state.collectionDetails,
          [id]: {
            data,
            loading: false,
            error: null,
            isLoaded: true,
          },
        },
      };
    }

    case FETCH_COLLECTION_DETAILS_ERROR: {
      const { id, error } = action.payload;
      return {
        ...state,
        collectionDetails: {
          ...state.collectionDetails,
          [id]: {
            data: null,
            loading: false,
            error,
            isLoaded: true,
          },
        },
      };
    }

    case UPDATE_COLLECTION_DETAILS_PARTIAL: {
      const { id, partialData } = action.payload;
      const currentCollection = state.collectionDetails?.[id];

      if (!currentCollection || !currentCollection.data) return state;

      return {
        ...state,
        collectionDetails: {
          ...state.collectionDetails,
          [id]: {
            ...currentCollection,
            data: {
              ...currentCollection.data,
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
