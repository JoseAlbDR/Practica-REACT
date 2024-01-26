import { Dispatch } from 'redux';
import { IAdvert } from '../../interfaces/advert.interface';
import { ReduxState } from '../../interfaces/state.interface';
import { types } from '../types';
import { Payload } from './action.interfaces';
import { failureAction } from './failure.action';
import { AppDispatch } from '../../main';
import { getAdvert } from '../selectors';
import { toast } from 'react-toastify';
import { getMinMaxPrice } from '../../utils';
import { ITags } from '../../interfaces/tags.interface';

export const advertsLoadedSuccess = (adverts: IAdvert[]) => ({
  type: types.ADVERTS_LOADED_SUCCESS,
  payload: adverts,
});

export const advertsLoadedRequest = () => ({
  type: types.ADVERTS_LOADED_REQUEST,
});

export const advertsLoadedFailure = (error: unknown) =>
  failureAction({ type: types.ADVERTS_LOADED_FAILURE, error });

export const advertsGetMinMaxPrice = (adverts: IAdvert[]) => {
  return {
    type: types.ADVERTS_GET_MIN_MAX_PRICE,
    payload: getMinMaxPrice(adverts),
  };
};

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
      dispatch(advertsGetMinMaxPrice(data));
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
      dispatch(advertDetailFailure(err));
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

export const advertsFilter = (
  adverts: IAdvert[],
  params: { [key: string]: string }
) => ({
  type: types.ADVERTS_FILTER,
  payload: adverts,
  params,
});

export function filterAdverts(params: { [key: string]: string }) {
  return (
    dispatch: AppDispatch,
    getState: () => ReduxState
    // { api: { adverts }, router }: Payload
  ) => {
    let filteredAdverts = [...getState().adverts.data];

    if (!params) return;

    if (params.name)
      filteredAdverts = filteredAdverts.filter(
        (advert) => advert.name === params.name
      );

    if (params.type && params.type !== 'all') {
      const sale = params.type === 'On sale';
      filteredAdverts = filteredAdverts.filter(
        (advert) => advert.sale === sale
      );
    }

    if (params.maxPrice && params.minPrice) {
      filteredAdverts = filteredAdverts.filter(
        (advert) =>
          advert.price <= +params.maxPrice && advert.price >= +params.minPrice
      );

      if (params.tags && params.tags.length > 0) {
        filteredAdverts = filteredAdverts.filter((advert) => {
          const tags = params.tags.split('-') as ITags[];
          return tags.every((tag) => advert.tags.includes(tag));
        });
      }
    }

    dispatch(advertsFilter(filteredAdverts, params));
  };
}
