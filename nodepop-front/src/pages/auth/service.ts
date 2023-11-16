import customFetch from '../../api/customFetch';
import { ILogin, IUser } from '../../interfaces/auth.interfaces';

export const signup = async (user: IUser) => {
  const response = await customFetch.post('/auth/signup', user);
  console.log(response);
  return response;
};

export const login = async (user: ILogin, remember: boolean) => {
  const { accessToken } = (await customFetch.post('auth/login', user)) as {
    accessToken: string;
  };

  if (remember) localStorage.setItem('accessToken', accessToken);
};
