import { ReduxState } from '../interfaces/state.interface';

export const getAuth = (state: ReduxState) => state.auth;

export const getTags = (state: ReduxState) => state.tags;
