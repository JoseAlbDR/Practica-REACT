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
    params: {},
  },
  tags: [],
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

export function tags(state = initialState.tags, action: UnknownAction) {
  switch (action.type) {
    case types.ADVERTS_LOAD_TAGS:
      return action.payload;
    default:
      return state;
  }
}

// interface AdvertsAction {
//   type: string;
//   payload: {
//     adverts: IAdvert[];
//     params: { [key: string]: string };
//   };
// }

export function adverts(state = initialState.adverts, action: UnknownAction) {
  switch (action.type) {
    case types.ADVERTS_LOADED_SUCCESS:
      return {
        loaded: true,
        data: action.adverts,
        params: action.params,
      };
    default:
      return state;
  }
}

export function ui(state = initialState.ui, action: UnknownAction) {
  if (action.error) {
    return { isFetching: false, error: action.payload };
  }

  if (action.type.endsWith('/request')) {
    return { isFetching: true, error: null };
  }

  if (action.type.endsWith('/success')) {
    return { isFetching: false, error: null };
  }

  if (action.type === types.UI_RESET_ERROR) {
    return { ...state, error: null };
  }

  return state;
}
