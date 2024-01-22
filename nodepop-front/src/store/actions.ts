import { Dispatch } from 'redux';
import { types } from './types';
import { ILogin } from '../interfaces/auth.interfaces';
import type { Router } from '@remix-run/router';
import { ReduxState } from '../interfaces/state.interface';
import { toast } from 'react-toastify';
import { IAdvert } from '../interfaces/advert.interface';
import { AxiosPromise } from 'axios';
import { ITags } from '../interfaces/tags.interface';

export interface Credentials {
  email: string;
  password: string;
}

interface Api {
  auth: Auth;
  adverts: Adverts;
}

interface Adverts {
  createAdvert: (advert: FormData) => Promise<void>;
  getAllAdverts: () => AxiosPromise<IAdvert[]>;
  getTags: () => Promise<ITags[]>;
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
    _getState: () => ReduxState,
    { api: { auth } }: Payload
  ) {
    try {
      await auth.login(credentials, rememberMe);
      dispatch(authLoginSuccess());
      toast.success('User logged in successfully');
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
export const authLogout = () => ({
  type: types.AUTH_LOGOUT,
});

export function loginOut() {
  return (
    dispatch: Dispatch,
    _getState: () => ReduxState,
    { api: { auth } }: Payload
  ) => {
    auth.logout();
    dispatch(authLogout());
  };
}

export const tagsLoadedSuccess = (tags: ITags[]) => ({
  type: types.ADVERTS_LOAD_TAGS,
  payload: tags,
});

export function advertsLoadTags() {
  return async (
    dispatch: Dispatch,
    getState: () => ReduxState,
    { api: { adverts } }: Payload
  ) => {
    try {
      const tags = await adverts.getTags();
      dispatch(tagsLoadedSuccess(tags));
    } catch (error) {
      console.log(error);
    }
  };
}
