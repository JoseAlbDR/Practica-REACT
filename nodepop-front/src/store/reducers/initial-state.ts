import { ReduxState } from '../../interfaces/state.interface';

export const initialState: ReduxState = {
  auth: {
    isLoggedIn: false,
    rememberMe: false,
  },
  adverts: {
    loaded: false,
    data: [],
    params: {},
    filteredAdverts: [],
    advertDetail: null,
    prices: {
      min: 0,
      max: 0,
    },
  },
  tags: [],
  ui: {
    isFetching: false,
    error: null,
  },
};
