import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { ReduxState } from '../interfaces/state.interface';

export type AppThunk<
  ActionTypes extends Action,
  ReturnType = void
> = ThunkAction<ReturnType, ReduxState, unknown, ActionTypes>;

export const types = {
  AUTH_LOGIN_REQUEST: 'auth/login/request',
  AUTH_LOGIN_SUCCESS: 'auth/login/success',
  AUTH_LOGIN_FAILURE: 'auth/login/failure',

  AUTH_REMEMBER_ME: 'auth/remember',
  AUTH_LOGOUT: 'auth/logout',

  ADVERTS_LOADED_REQUEST: 'adverts/loaded/request',
  ADVERTS_LOADED_SUCCESS: 'adverts/loaded/success',

  ADVERT_CREATED: 'advert/created',
};
