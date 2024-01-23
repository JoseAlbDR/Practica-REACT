import { Dispatch } from 'redux';
import { IAdvert } from '../../interfaces/advert.interface';
import { ReduxState } from '../../interfaces/state.interface';
import { types } from '../types';
import { Payload } from './action.interfaces';
import { failureAction } from './failure.action';
import { AppDispatch } from '../../main';
import { getAdvert } from '../selectors';
import { toast } from 'react-toastify';

export const advertsLoadedSuccess = (adverts: IAdvert[]) => ({
  type: types.ADVERTS_LOADED_SUCCESS,
  payload: adverts,
});

export const advertsLoadedRequest = () => ({
  type: types.ADVERTS_LOADED_REQUEST,
});

export const advertsLoadedFailure = (error: unknown) =>
  failureAction({ type: types.ADVERTS_LOADED_FAILURE, error });

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
      dispatch(advertsLoadedFailure(error));
    }
  };
}

export const advertDetailSuccess = (advert: IAdvert) => ({
  type: types.ADVERT_DETAIL_SUCCESS,
  payload: advert,
});

export const advertDetailRequest = () => ({
  type: types.ADVERT_DETAIL_REQUEST,
});

export const advertDetailFailure = (error: unknown) =>
  failureAction({ type: types.ADVERT_DETAIL_FAILURE, error });

export function advertDetail(id: string) {
  return async (
    dispatch: AppDispatch,
    getState: () => ReduxState,
    { api: { adverts } }: Payload
  ) => {
    const advert = getAdvert(id)(getState());

    if (advert) {
      dispatch(advertDetailSuccess(advert));
      return;
    }

    try {
      dispatch(advertDetailRequest());
      const advert = await adverts.getAdvert(id);
      dispatch(advertDetailSuccess(advert));
    } catch (err) {
      dispatch(advertsCreatedFailure(err));
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

export const advertsCreatedFailure = (error: unknown) =>
  failureAction({ type: types.ADVERT_CREATED_FAILURE, error });

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
      dispatch(advertDetailSuccess(newAdvert));
      toast.success('Advert created successfully');
      router?.navigate(`/adverts/${newAdvert.id}`);
    } catch (err) {
      dispatch(advertsCreatedFailure(err));
    }
  };
}

export const advertsDeletedRequest = () => ({
  type: types.ADVERTS_DELETED_REQUEST,
});

export const advertsDeletedSuccess = () => ({
  type: types.ADVERTS_DELETED_SUCCESS,
});

export const advertsDeletedFailure = (error: unknown) =>
  failureAction({ type: types.ADVERTS_DELETED_FAILURE, error });

export function deleteAdvert(id: string) {
  return async (
    dispatch: AppDispatch,
    _getState: () => ReduxState,
    { api: { adverts }, router }: Payload
  ) => {
    try {
      dispatch(advertsDeletedRequest());
      await adverts.deleteAdvert(id);
      dispatch(advertsDeletedSuccess());
      dispatch(loadAdverts());
      router?.navigate(`/adverts`);
    } catch (err) {
      dispatch(advertsDeletedFailure(err));
    }
  };
}
