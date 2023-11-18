import customFetch, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../../api/customFetch';
import { ILogin, IUser } from '../../interfaces/auth.interfaces';
import { storage } from '../../utils';

export const signup = async (user: IUser) => {
  const userData = await customFetch.post('/auth/signup', user);
  return userData;
};

export const login = async (user: ILogin, remember: boolean) => {
  const { accessToken } = (await customFetch.post('auth/login', user)) as {
    accessToken: string;
  };

  setAuthorizationHeader(accessToken);

  if (remember) {
    storage.set('accessToken', accessToken);
    storage.set('rememberUser', remember.toString());
  }
};

export const logout = async () => {
  removeAuthorizationHeader();
  storage.remove('accessToken');
};
