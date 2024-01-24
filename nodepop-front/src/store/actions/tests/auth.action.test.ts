import {
  authLogin,
  authLoginFailure,
  authLoginRequest,
  authLoginSuccess,
} from '..';
import { IAdvert } from '../../../interfaces/advert.interface';

import { types } from '../../types';
import { Api, Credentials } from '../action.interfaces';

describe('authLoginSuccess', () => {
  test('Should return a login success action', () => {
    const action = authLoginSuccess();

    expect(action).toEqual({ type: types.AUTH_LOGIN_SUCCESS });
  });
});

describe('authLoginRequest', () => {
  test('Should return a login request action', () => {
    const action = authLoginRequest();

    expect(action).toEqual({ type: types.AUTH_LOGIN_REQUEST });
  });
});

describe('authLogin', () => {
  const adverts: IAdvert[] = [
    {
      name: 'test',
      sale: true,
      price: 123,
      tags: ['motor'],
      photo: 'test',
      id: '1',
    },
    {
      name: 'test1',
      sale: false,
      price: 321,
      tags: ['motor', 'lifestyle', 'mobile', 'work'],
      photo: 'test1',
      id: '2',
    },
  ];
  const credentials: Credentials = {
    username: 'test@test.com',
    password: 'test',
  };
  const action = authLogin(credentials, false);
  const redirectUrl: string = '/adverts';
  const dispatch = jest.fn();
  const api: Api = {
    auth: {
      login: async () => {},
      logout: async () => {},
    },
    adverts: {
      createAdvert: async () => adverts[0],
      getAllAdverts: async () => [],
      getTags: async () => [],
      deleteAdvert: async () => {},
      getAdvert: async () => adverts[0],
    },
  };
  const router = {
    navigate: jest.fn(),
    basename: '',
    state: {},
    routes: [],
    window: window,
    initialize: () => {},
    subscribe: () => {},
    enableScrollRestoration: true,
    fetch,
    revalidate: () => {},
    createHref: () => {},
    encodeLocation: () => {},
    getFetcher: () => {},
    deleteFetcher: () => {},
    dispose: () => {},
    getBlocker: () => {},
    deleteBlocker: () => {},
    _internalSetRoutes: () => {}, // Añade las propiedades adicionales requeridas por la interfaz
    _internalFetchControllers: () => {}, // Añade las propiedades adicionales requeridas por la interfaz
    _internalActiveDeferreds: () => {},
  };

  test('Should auth login should be success', async () => {
    api.auth.login = jest.fn().mockResolvedValue({ accessToken: 'token ' });

    const result = await action(dispatch, undefined, { api, router });

    expect(result).toEqual({ accessToken: 'token' });
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
    expect(dispatch).toHaveBeenNthCalledWith(2, authLoginRequest());
    expect(api.auth.login).toHaveBeenCalledWith(credentials);
    expect(router.navigate).toHaveBeenLastCalledWith(redirectUrl);
  });

  test('Should return an error', async () => {
    const error = new Error('Unauthorized');
    api.auth.login = jest.fn().mockRejectedValue(error);

    await action(dispatch, undefined, { api, router });

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
    expect(api.auth.login).toHaveBeenCalledWith(credentials);
    expect(dispatch).toHaveBeenNthCalledWith(2, authLoginFailure(error));
    expect(router.navigate).not.toHaveBeenLastCalledWith(redirectUrl);
  });
});
