import { Dispatch } from 'redux';
import { toast } from 'react-toastify';
import { ReduxState } from '../../interfaces/state.interface';
import { types } from '../types';
import {
  AuthLogoutAction,
  Credentials,
  Payload,
  PayloadType,
} from './action.interfaces';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../main';

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

export const authLogout = () => ({
  type: types.AUTH_LOGOUT,
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

export const authRememberMe = () => {
  return {
    type: types.AUTH_REMEMBER_ME,
  };
};
