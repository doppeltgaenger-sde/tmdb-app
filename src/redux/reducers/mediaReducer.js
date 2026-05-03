import {
  FETCH_MEDIA_TRACK_START,
  FETCH_MEDIA_TRACK_SUCCESS,
  FETCH_MEDIA_TRACK_ERROR,
} from "@actions";

const initialState = {
  mediaTracks: {
    trendingTrack: {
      today: { 
        data: [], 
        loading: false, 
        error: null, 
        isLoaded: false 
      },
      week: { 
        data: [], 
        loading: false, 
        error: null, 
        isLoaded: false 
      },
    },

    popularTrack: {
      streaming: { 
        data: [], 
        loading: false, 
        error: null, 
        isLoaded: false 
      },
      tv: { 
        data: [], 
        loading: false, 
        error: null, 
        isLoaded: false 
      },
      rent: { 
        data: [], 
        loading: false, 
        error: null, 
        isLoaded: false 
      },
      theaters: { 
        data: [], 
        loading: false, 
        error: null, 
        isLoaded: false 
      },
    },

    freeTrack: {
      movie: { 
        data: [], 
        loading: false, 
        error: null, 
        isLoaded: false 
      },
      tv: { 
        data: [], 
        loading: false, 
        error: null, 
        isLoaded: false 
      },
    },

    trailersTrack: {
      popular: { 
        data: [], 
        loading: false, 
        error: null, 
        isLoaded: false 
      },
      streaming: { 
        data: [], 
        loading: false, 
        error: null, 
        isLoaded: false 
      },
      tv: { 
        data: [], 
        loading: false, 
        error: null, 
        isLoaded: false 
      },
      rent: { 
        data: [], 
        loading: false, 
        error: null, 
        isLoaded: false 
      },
      theaters: { 
        data: [], 
        loading: false, 
        error: null, 
        isLoaded: false 
      },
    },
  },
};

export const mediaReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEDIA_TRACK_START: {
      const { track, tab } = action.payload;
      return {
        ...state,
        mediaTracks: {
          ...state.mediaTracks,
          [track]: {
            ...state.mediaTracks[track],
            [tab]: {
              ...state.mediaTracks[track][tab],
              loading: true,
              error: null,
            },
          },
        },
      };
    }

    case FETCH_MEDIA_TRACK_SUCCESS: {
      const { track, tab, data } = action.payload;
      return {
        ...state,
        mediaTracks: {
          ...state.mediaTracks,
          [track]: {
            ...state.mediaTracks[track],
            [tab]: {
              data,
              loading: false,
              error: null,
              isLoaded: true,
            },
          },
        },
      };
    }

    case FETCH_MEDIA_TRACK_ERROR: {
      const { track, tab, error } = action.payload;
      return {
        ...state,
        mediaTracks: {
          ...state.mediaTracks,
          [track]: {
            ...state.mediaTracks[track],
            [tab]: {
              ...state.mediaTracks[track][tab],
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
