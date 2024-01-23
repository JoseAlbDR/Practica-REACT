import { authLoginRequest, authLoginSuccess } from '..';
import { types } from '../../types';

describe('authLoginSuccess', () => {
  test('Should return a login success action', () => {
    const action = authLoginSuccess();

    expect(action).toEqual({ type: types.AUTH_LOGIN_SUCCESS });
  });

  test('Should return a login request action', () => {
    const action = authLoginRequest();

    expect(action).toEqual({ type: types.AUTH_LOGIN_REQUEST });
  });
});
