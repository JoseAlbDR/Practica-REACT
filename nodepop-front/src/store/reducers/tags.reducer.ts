import { types } from '../types';
import { initialState } from './initial-state';
import { UnknownAction } from 'redux';

export function tags(state = initialState.tags, action: UnknownAction) {
  switch (action.type) {
    case types.ADVERTS_LOADED_TAGS:
      return action.payload;
    default:
      return state;
  }
}
