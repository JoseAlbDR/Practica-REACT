import { types } from '../types';
import { initialState } from './initial-state';
import { UnknownAction } from 'redux';

export function adverts(state = initialState.adverts, action: UnknownAction) {
  switch (action.type) {
    case types.ADVERTS_LOADED_SUCCESS:
      return {
        ...state,
        loaded: true,
        data: action.adverts,
        params: action.params,
      };
    case types.ADVERT_DETAIL_LOADED:
      return {
        ...state,
        advertDetail: action.payload,
      };
    default:
      return state;
  }
}
