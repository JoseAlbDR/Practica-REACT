import { types } from '../types';
import { initialState } from './initial-state';
import { UnknownAction } from 'redux';

export function adverts(state = initialState.adverts, action: UnknownAction) {
  switch (action.type) {
    case types.ADVERTS_LOADED_SUCCESS:
      return {
        ...state,
        loaded: true,
        data: action.payload,
      };
    case types.ADVERT_DETAIL_SUCCESS:
      return {
        ...state,
        advertDetail: action.payload,
      };
    case types.ADVERTS_DELETED_SUCCESS:
      return {
        ...state,
        advertDetail: null,
      };
    default:
      return state;
  }
}