import customFetch from '../../api/customFetch';
import { IUser } from '../../interfaces/auth.interfaces';

export const signup = async (user: IUser) => {
  const response = await customFetch.post('/auth/signup', user);
  console.log(response);
};
