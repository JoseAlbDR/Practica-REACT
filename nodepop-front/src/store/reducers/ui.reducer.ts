import { types } from '../types';
import { initialState } from './initial-state';
import { UnknownAction } from 'redux';

export function ui(state = initialState.ui, action: UnknownAction) {
  if (action.error) {
    return { isFetching: false, error: action.payload };
  }

  if (action.type.endsWith('/request')) {
    return { isFetching: true, error: null };
  }

  if (action.type.endsWith('/success')) {
    return { isFetching: false, error: null };
  }

  if (action.type === types.UI_RESET_ERROR) {
    return { ...state, error: null };
  }

  return state;
}
