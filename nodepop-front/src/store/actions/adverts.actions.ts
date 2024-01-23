import { Dispatch } from 'redux';
import { IAdvert } from '../../interfaces/advert.interface';
import { ReduxState } from '../../interfaces/state.interface';
import { types } from '../types';
import { Payload } from './action.interfaces';
import { failureAction } from './failure.action';
import { AppDispatch } from '../../main';

export const advertsLoadedSuccess = (adverts: IAdvert[]) => ({
  type: types.ADVERTS_LOADED_SUCCESS,
  adverts,
});

export const advertsLoadedRequest = () => ({
  type: types.ADVERTS_LOADED_REQUEST,
});

export function loadAdverts() {
  return async (
    dispatch: Dispatch,
    _getState: () => ReduxState,
    { api: { adverts } }: Payload
  ) => {
    try {
      dispatch(advertsLoadedRequest());
      const data = await adverts.getAllAdverts();
      dispatch(advertsLoadedSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export const advertsCreatedRequest = () => ({
  type: types.ADVERT_CREATED_REQUEST,
});

export const advertsCreatedSuccess = (advert: IAdvert) => ({
  type: types.ADVERT_CREATED_SUCCESS,
  payload: advert,
});

export const advertDetailLoaded = (advert: IAdvert) => ({
  type: types.ADVERT_DETAIL_LOADED,
  payload: advert,
});

export const advertsCreatedFailure = failureAction;

export function createAdvert(advert: FormData) {
  return async (
    dispatch: AppDispatch,
    _getState: () => ReduxState,
    { api: { adverts }, router }: Payload
  ) => {
    try {
      dispatch(advertsCreatedRequest());
      const newAdvert = await adverts.createAdvert(advert);
      dispatch(advertsCreatedSuccess(newAdvert));
      dispatch(loadAdverts());
      dispatch(advertDetailLoaded(newAdvert));
      router?.navigate(`/adverts/${newAdvert.id}`);
    } catch (err) {
      console.log(err);
    }
  };
}
