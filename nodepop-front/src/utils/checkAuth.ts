import { setAuthorizationHeader } from '../api/customFetch';

export const checkAuth = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    setAuthorizationHeader(accessToken);
  }
};
