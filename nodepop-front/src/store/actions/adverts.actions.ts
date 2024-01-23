import { Dispatch } from 'redux';
import { IAdvert } from '../../interfaces/advert.interface';
import { ReduxState } from '../../interfaces/state.interface';
import { types } from '../types';
import { Payload } from './action.interfaces';

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
