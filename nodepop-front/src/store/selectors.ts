import { ReduxState } from '../interfaces/state.interface';

export const getUi = (state: ReduxState) => state.ui;

export const getAuth = (state: ReduxState) => state.auth;
