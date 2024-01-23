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
    advertDetail: null,
  },
  tags: [],
  ui: {
    isFetching: false,
    error: null,
  },
};
