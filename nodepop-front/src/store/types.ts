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
  ADVERTS_LOADED_FAILURE: 'adverts/loaded/failure',
  ADVERTS_GET_MIN_MAX_PRICE: 'adverts/get_min_max_price',
  ADVERTS_FILTER: 'adverts/filter',

  ADVERTS_DELETED_REQUEST: 'adverts/deleted/request',
  ADVERTS_DELETED_SUCCESS: 'adverts/deleted/success',
  ADVERTS_DELETED_FAILURE: 'adverts/deleted/failure',

  ADVERTS_LOADED_TAGS: 'adverts/load/tags',

  ADVERT_CREATED_REQUEST: 'advert/created/request',
  ADVERT_CREATED_SUCCESS: 'advert/created/success',
  ADVERT_CREATED_FAILURE: 'advert/created/failure',

  ADVERT_DETAIL_REQUEST: 'adverts/detail/request',
  ADVERT_DETAIL_SUCCESS: 'adverts/detail/success',
  ADVERT_DETAIL_FAILURE: 'adverts/detail/failure',
  ADVERT_DETAIL_LOADED: 'adverts/detail/loaded',

  UI_RESET_ERROR: 'ui/reset_error',
};
