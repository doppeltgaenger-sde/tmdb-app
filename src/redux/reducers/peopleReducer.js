import {
  FETCH_PEOPLE_START,
  FETCH_PEOPLE_SUCCESS,
  FETCH_PEOPLE_ERROR,
} from "@actions";

const initialState = {
  people: {},
};

export const peopleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PEOPLE_START: {
      const { page } = action.payload;
      const prevState = state.people?.[page];

      if (prevState?.isLoaded) {
        return state;
      }

      const isPageChange = Object.keys(state.people).length > 0;

      return {
        ...state,
        people: {
          ...state.people,
          [page]: {
            ...prevState, 
            data: prevState?.data || null,
            loading: !isPageChange,
            pageLoading: isPageChange,
            isLoaded: false,
            error: null,
          },
        },
      };
    }

    case FETCH_PEOPLE_SUCCESS: {
      const { page, data } = action.payload;
      const prevState = state.people?.[page];

      return {
        ...state,
        people: {
          ...state.people,
          [page]: {
            ...prevState,
            data: {
              ...data,
            },
            loading: false,
            pageLoading: false,
            isLoaded: true,
            error: null,
          },
        },
      };
    }

    case FETCH_PEOPLE_ERROR: {
      const { page, error } = action.payload;
      const prevState = state.people?.[page];

      return {
        ...state,
        people: {
          ...state.people,
          [page]: {
            ...prevState,
            loading: false,
            pageLoading: false,
            error,
            isLoaded: prevState?.isLoaded || false,
          },
        },
      };
    }

    default:
      return state;
  }
};
