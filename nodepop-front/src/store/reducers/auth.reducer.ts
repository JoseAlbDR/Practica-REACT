import { types } from '../types';
import { initialState } from './initial-state';
import { UnknownAction } from 'redux';

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
