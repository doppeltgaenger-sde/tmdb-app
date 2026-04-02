import {
  FETCH_MEDIA_TRACK_START,
  FETCH_MEDIA_TRACK_SUCCESS,
  FETCH_MEDIA_TRACK_ERROR,
} from "@actions/mediaActions";

const initialState = {
  mediaTracks: {
    trendingTrack: {
      today: {
        data: [],
        loading: false,
        error: null,
      },
      week: {
        data: [],
        loading: false,
        error: null,
      },
    },

    popularTrack: {
      streaming: {
        data: [],
        loading: false,
        error: null,
      },
      tv: {
        data: [],
        loading: false,
        error: null,
      },
      rent: {
        data: [],
        loading: false,
        error: null,
      },
      theaters: {
        data: [],
        loading: false,
        error: null,
      },
    },

    freeTrack: {
      movie: {
        data: [],
        loading: false,
        error: null,
      },
      tv: {
        data: [],
        loading: false,
        error: null,
      },
    },

    trailersTrack: {
      popular: {
        data: [],
        loading: false,
        error: null,
      },
      streaming: {
        data: [],
        loading: false,
        error: null,
      },
      tv: {
        data: [],
        loading: false,
        error: null,
      },
      rent: {
        data: [],
        loading: false,
        error: null,
      },
      theaters: {
        data: [],
        loading: false,
        error: null,
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
              ...state.mediaTracks[track][tab],
              data,
              loading: false,
              error: null,
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
            },
          },
        },
      };
    }

    default:
      return state;
  }
};
