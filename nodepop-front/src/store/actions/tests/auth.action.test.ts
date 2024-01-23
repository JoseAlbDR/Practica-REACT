import {
  authLogin,
  authLoginFailure,
  authLoginRequest,
  authLoginSuccess,
} from '..';
import { types } from '../../types';
import { Credentials } from '../action.interfaces';

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
  const credentials: Credentials = {
    username: 'test@test.com',
    password: 'test',
  };
  const action = authLogin(credentials, false);
  const redirectUrl: string = '/adverts';
  const dispatch = jest.fn();
  const api = {
    auth: {
      login: async () => {},
      logout: async () => {},
    },
    adverts: {
      createAdvert: async (advert: FormData) => advert,
      getAllAdverts: async () => [],
      getTags: async () => [],
      deleteAdvert: async (id: string) => {},
      getAdvert: async (id: string) => {},
    },
  };
  const router = {
    navigate: jest.fn(),
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
