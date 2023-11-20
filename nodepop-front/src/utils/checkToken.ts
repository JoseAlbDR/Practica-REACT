import { storage } from '.';
import { setAuthorizationHeader } from '../api/customFetch';

export const checkToken = () => {
  const accessToken = storage.get('accessToken');

  if (accessToken) {
    setAuthorizationHeader(accessToken);
  }
};
