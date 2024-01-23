import { auth } from '..';
import { Auth } from '../../../interfaces/state.interface';
import {
  advertsCreatedRequest,
  authLoginSuccess,
  authLogout,
  authRememberMe,
} from '../../actions';
import { initialState } from '../initial-state';

describe('auth.reducer.ts', () => {
  const state: Auth = initialState.auth;

  test("Should manage 'AUTH_LOGIN_SUCCESS' actions", () => {
    const action = authLoginSuccess();

    expect(auth(state, action)).toEqual({
      isLoggedIn: true,
      rememberMe: state.rememberMe,
    });
  });

  test("Should manage 'AUTH_LOGOUT' actions", () => {
    const action = authLogout();
    expect(auth(state, action)).toEqual({
      isLoggedIn: false,
      rememberMe: state.rememberMe,
    });
  });

  test("Should manage 'AUTH_REMEMBER_ME' actions", () => {
    const action = authRememberMe();

    expect(auth(state, action)).toEqual({
      isLoggedIn: state.isLoggedIn,
      rememberMe: !state.rememberMe,
    });

    state.rememberMe = true;

    expect(auth(state, action)).toEqual({
      isLoggedIn: state.isLoggedIn,
      rememberMe: !state.rememberMe,
    });
  });

  test("Should manage 'ANY' actions", () => {
    const action = advertsCreatedRequest();

    expect(auth(state, action)).toEqual(state);
  });
  test("Should manage 'ANY' action when state is not defined", () => {
    const state = undefined;
    const action = advertsCreatedRequest();

    expect(auth(state, action)).toBe(initialState.auth);
  });
});
