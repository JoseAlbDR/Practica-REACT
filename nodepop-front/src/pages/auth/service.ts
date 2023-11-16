import customFetch, { setAuthorizationHeader } from '../../api/customFetch';
import { ILogin, IUser } from '../../interfaces/auth.interfaces';

export const signup = async (user: IUser) => {
  const userData = await customFetch.post('/auth/signup', user);
  return userData;
};

export const login = async (user: ILogin, remember: boolean) => {
  const { accessToken } = (await customFetch.post('auth/login', user)) as {
    accessToken: string;
  };

  setAuthorizationHeader(accessToken);

  if (remember) localStorage.setItem('accessToken', accessToken);
};
