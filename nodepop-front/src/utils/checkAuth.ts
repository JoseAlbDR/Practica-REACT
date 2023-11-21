import { storage } from '.';
import { setAuthorizationHeader } from '../api/customFetch';

export const checkAuth = () => {
  const accessToken = storage.get('accessToken');

  if (accessToken) setAuthorizationHeader(accessToken);
};
