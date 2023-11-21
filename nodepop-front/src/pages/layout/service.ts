import customFetch from '../../api/customFetch';

export const getUser = async () => {
  const user = await customFetch.get('/auth/me');
  return user;
};
