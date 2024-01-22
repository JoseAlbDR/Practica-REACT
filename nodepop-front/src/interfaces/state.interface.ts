import { IAdvert } from './advert.interface';

export interface ReduxState {
  auth: Auth;
  adverts?: Adverts;
  ui?: Ui;
}

interface Auth {
  isLoggedIn: boolean;
  rememberMe: boolean;
}

interface Adverts {
  loaded: boolean;
  data: IAdvert[];
}

export interface Ui {
  isFetching: boolean;
  error: string | null;
}
