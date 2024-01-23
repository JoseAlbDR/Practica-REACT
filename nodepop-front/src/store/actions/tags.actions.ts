import { Dispatch } from 'redux';
import { ReduxState } from '../../interfaces/state.interface';
import { ITags } from '../../interfaces/tags.interface';
import { types } from '../types';
import { Payload } from './action.interfaces';

export const tagsLoadedSuccess = (tags: ITags[]) => ({
  type: types.ADVERTS_LOADED_TAGS,
  payload: tags,
});

export function loadTags() {
  return async (
    dispatch: Dispatch,
    _getState: () => ReduxState,
    { api: { adverts } }: Payload
  ) => {
    try {
      const tags = await adverts.getTags();
      dispatch(tagsLoadedSuccess(tags));
    } catch (error) {
      console.log(error);
    }
  };
}
