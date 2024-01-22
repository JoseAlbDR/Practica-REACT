import { IAdvert } from './advert.interface';

export interface ReduxState {
  auth: boolean;
  adverts?: Adverts;
  ui?: Ui;
}

interface Adverts {
  loaded: boolean;
  data: IAdvert[];
}

interface Ui {
  isFetching: boolean;
  error: string | null;
}
