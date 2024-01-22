import { Dispatch } from 'redux';
import { types } from './types';
import { ILogin } from '../interfaces/auth.interfaces';
import type { Router } from '@remix-run/router';
import { ReduxState } from '../interfaces/state.interface';
import { toast } from 'react-toastify';

export interface Credentials {
  email: string;
  password: string;
}

interface Api {
  auth: Auth;
}

interface Auth {
  login: (user: ILogin, remember: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

export interface Payload {
  api: Api;
  router?: Router;
}

export const authLoginRequest = () => ({
  type: types.AUTH_LOGIN_REQUEST,
});

export const authLoginSuccess = () => ({
  type: types.AUTH_LOGIN_SUCCESS,
});

export const authLoginFailure = (error: unknown) => ({
  type: types.AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
});

export function authLogin(credentials: Credentials, rememberMe: boolean) {
  return async function (
    dispatch: Dispatch,
    getState: () => ReduxState,
    { api: { auth }, router }: Payload
  ) {
    try {
      dispatch(authLoginRequest());
      await auth.login(credentials, rememberMe);
      dispatch(authLoginSuccess());
      toast.success('User logged in successfully');
      router!.navigate('/adverts');
    } catch (error) {
      dispatch(authLoginFailure(error));
      throw error;
    }
  };
}

export const authRememberMe = () => {
  return {
    type: types.AUTH_REMEMBER_ME,
  };
};

export const authLogout =
  () =>
  (
    _dispatch: Dispatch,
    _getState: () => ReduxState,
    { api: { auth }, router }: Payload
  ) => {
    auth.logout();
    router!.navigate('/login');
    return {
      type: types.AUTH_REMEMBER_ME,
    };
  };
