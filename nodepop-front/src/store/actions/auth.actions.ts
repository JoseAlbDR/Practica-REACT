import { Dispatch } from 'redux';
import { toast } from 'react-toastify';

import { types } from '../types';
import {
  AuthLogoutAction,
  Credentials,
  Payload,
  PayloadType,
} from './action.interfaces';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../main';
import { failureAction } from './failure.action';
import { ReduxState } from '../../interfaces/state.interface';
// import { ReduxState } from '../../interfaces/state.interface';

export const authLoginRequest = () => ({
  type: types.AUTH_LOGIN_REQUEST,
});

export const authLoginSuccess = () => ({
  type: types.AUTH_LOGIN_SUCCESS,
});

export const authLoginFailure = (error: unknown) =>
  failureAction({ type: types.AUTH_LOGIN_FAILURE, error });

export const authLogout = () => ({
  type: types.AUTH_LOGOUT,
});

export function authLogin(credentials: Credentials, rememberMe: boolean) {
  return async function (
    dispatch: Dispatch,
    _getState: () => ReduxState | undefined,
    { api: { auth }, router }: Payload
  ) {
    router?.initialize;
    try {
      dispatch(authLoginRequest());
      await auth.login(credentials, rememberMe);
      dispatch(authLoginSuccess());
      toast.success('User logged in successfully');
      router?.navigate('/adverts');
    } catch (error) {
      dispatch(authLoginFailure('Wrong username/password'));
      throw error;
    }
  };
}

export function loginOut(): ThunkAction<
  void,
  RootState,
  PayloadType,
  AuthLogoutAction
> {
  return (dispatch, _getState, { api: { auth } }) => {
    auth.logout();
    dispatch(authLogout());
    toast.success('User logged out successfully');
  };
}

export const authRememberMe = () => {
  return {
    type: types.AUTH_REMEMBER_ME,
  };
};
