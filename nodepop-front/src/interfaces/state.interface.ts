import { IAdvert } from './advert.interface';
import { ITags } from './tags.interface';

export interface ReduxState {
  auth: Auth;
  adverts: Adverts;
  tags: ITags[];
  ui: Ui;
}

export interface Auth {
  isLoggedIn: boolean;
  rememberMe: boolean;
}

export interface Adverts {
  loaded: boolean;
  data: IAdvert[];
  params: { [key: string]: string };
  advertDetail: IAdvert | null;
}

export interface Ui {
  isFetching: boolean;
  error: Error | string | null;
}
