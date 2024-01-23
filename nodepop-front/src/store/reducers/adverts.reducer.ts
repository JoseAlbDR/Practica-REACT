import { types } from '../types';
import { initialState } from './initial-state';
import { UnknownAction } from 'redux';

export function adverts(state = initialState.adverts, action: UnknownAction) {
  switch (action.type) {
    case types.ADVERTS_LOADED_SUCCESS:
      return {
        loaded: true,
        data: action.adverts,
        params: action.params,
      };
    default:
      return state;
  }
}
