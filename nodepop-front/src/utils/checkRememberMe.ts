import { storage } from '.';
import { setAuthorizationHeader } from '../api/customFetch';

export const checkRememberMe = () => {
  const accessToken = storage.get('accessToken');

  if (accessToken) {
    setAuthorizationHeader(accessToken);
  }
};
