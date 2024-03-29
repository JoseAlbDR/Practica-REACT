import { ILogin } from '../../interfaces/auth.interfaces';
import type { Router } from '@remix-run/router';
import { types } from '../types';
import { IAdvert } from '../../interfaces/advert.interface';
import { ITags } from '../../interfaces/tags.interface';

export interface Auth {
  login: (user: ILogin, remember: boolean) => Promise<void>;
  logout: () => void;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface Api {
  auth: Auth;
  adverts: Adverts;
}

export interface Adverts {
  createAdvert: (advert: FormData) => Promise<IAdvert>;
  getAllAdverts: () => Promise<IAdvert[]>;
  getTags: () => Promise<ITags[]>;
  deleteAdvert: (id: string) => Promise<void>;
  getAdvert: (id: string) => Promise<IAdvert>;
}

export interface Payload {
  api: Api;
  router?: Router;
}

export type AuthLogoutAction = {
  type: typeof types.AUTH_LOGOUT;
};

export type PayloadType = {
  api: Api;
};
