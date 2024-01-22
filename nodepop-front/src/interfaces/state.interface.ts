import { IAdvert } from './advert.interface';
import { ITags } from './tags.interface';

export interface ReduxState {
  auth: Auth;
  adverts: Adverts;
  tags: ITags[];
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
