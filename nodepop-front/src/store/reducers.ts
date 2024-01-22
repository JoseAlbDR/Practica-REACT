import { ReduxState } from '../interfaces/state.interface';

import { UnknownAction } from 'redux';
import { types } from './types';

const initialState: ReduxState = {
  auth: {
    isLoggedIn: false,
    rememberMe: false,
  },
  adverts: {
    loaded: false,
    data: [],
  },
  ui: {
    isFetching: false,
    error: null,
  },
};

export function auth(state = initialState.auth, action: UnknownAction) {
  switch (action.type) {
    case types.AUTH_LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true };
    case types.AUTH_LOGOUT:
      return { ...state, isLoggedIn: false };
    case types.AUTH_REMEMBER_ME:
      return { ...state, rememberMe: state.rememberMe ? false : true };
    default:
      return state;
  }
}
