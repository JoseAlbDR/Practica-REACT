import { authLogin, authLoginRequest, authLoginSuccess } from '..';
import { IAdvert } from '../../../interfaces/advert.interface';

import { types } from '../../types';
import { Api, Credentials } from '../action.interfaces';
import type { Router } from '@remix-run/router';

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
    email: 'test@test.com',
    password: 'test',
  };
  const action = authLogin(credentials, false);
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
  let router: Router;
  const getState = jest.fn();

  test('Should auth login should be success', async () => {
    api.auth.login = jest.fn().mockResolvedValue({ accessToken: 'token ' });

    await action(dispatch, getState, { api, router });

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
    expect(dispatch).toHaveBeenNthCalledWith(2, authLoginSuccess());
    expect(api.auth.login).toHaveBeenCalledWith(credentials, false);
  });
});
