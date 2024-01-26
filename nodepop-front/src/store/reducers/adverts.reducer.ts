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
        filteredAdverts: action.payload,
      };
    case types.ADVERT_CREATED_SUCCESS:
      return {
        ...state,
        loaded: false,
        data: [...state.data, action.payload],
      };
    case types.ADVERT_DETAIL_SUCCESS:
      return {
        ...state,
        advertDetail: action.payload,
        filterAdverts: [],
      };
    case types.ADVERTS_DELETED_SUCCESS:
      return {
        ...state,
        advertDetail: null,
      };
    case types.ADVERTS_GET_MIN_MAX_PRICE:
      return {
        ...state,
        prices: action.payload,
      };

    case types.ADVERTS_FILTER:
      return {
        ...state,
        filteredAdverts: action.payload,
        params: action.params,
      };
    default:
      return state;
  }
}
