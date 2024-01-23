import { Dispatch } from 'redux';
import { types } from './types';
import { ILogin } from '../interfaces/auth.interfaces';
import type { Router } from '@remix-run/router';
import { ReduxState } from '../interfaces/state.interface';
import { toast } from 'react-toastify';
import { IAdvert } from '../interfaces/advert.interface';

import { ITags } from '../interfaces/tags.interface';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../main';

export interface Credentials {
  username: string;
  password: string;
}

export interface Api {
  auth: Auth;
  adverts: Adverts;
}

interface Adverts {
  createAdvert: (advert: FormData) => Promise<void>;
  getAllAdverts: () => Promise<IAdvert[]>;
  getTags: () => Promise<ITags[]>;
}

interface Auth {
  login: (user: ILogin, remember: boolean) => Promise<void>;
  logout: () => void;
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
    { api: { auth }, router }: Payload
  ) {
    try {
      await auth.login(credentials, rememberMe);
      dispatch(authLoginSuccess());
      toast.success('User logged in successfully');
      router?.navigate('/adverts');
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

type AuthLogoutAction = {
  type: typeof types.AUTH_LOGOUT;
};

type PayloadType = {
  api: Api;
};

export function loginOut(): ThunkAction<
  void,
  RootState,
  PayloadType,
  AuthLogoutAction
> {
  return (dispatch, _getState, { api: { auth } }) => {
    auth.logout();
    dispatch(authLogout());
  };
}

export const tagsLoadedSuccess = (tags: ITags[]) => ({
  type: types.ADVERTS_LOAD_TAGS,
  payload: tags,
});

export function loadTags() {
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

export const advertsLoadedSuccess = (
  adverts: IAdvert[],
  params: { [key: string]: string }
) => ({
  type: types.ADVERTS_LOADED_SUCCESS,
  adverts,
  params,
});

export const advertsLoadedRequest = () => ({
  type: types.ADVERTS_LOADED_REQUEST,
});

export function loadAdverts() {
  return async (
    dispatch: Dispatch,
    getState: () => ReduxState,
    { api: { adverts } }: Payload
  ) => {
    try {
      dispatch(advertsLoadedRequest());
      const data = await adverts.getAllAdverts();
      dispatch(advertsLoadedSuccess(data, {}));
    } catch (error) {
      console.log(error);
    }
  };
}
