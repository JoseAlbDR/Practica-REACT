import { ReduxState } from '../interfaces/state.interface';

export const getAuth = (state: ReduxState) => state.auth;

export const getTags = (state: ReduxState) => state.tags;

export const getAdverts = (state: ReduxState) => state.adverts.data;

export const getIsLoaded = (state: ReduxState) => state.adverts.loaded;

export const getParams = (state: ReduxState) => state.adverts.params;

export const getUi = (state: ReduxState) => state.ui;

export const getAdvertDetail = (state: ReduxState) =>
  state.adverts.advertDetail;
