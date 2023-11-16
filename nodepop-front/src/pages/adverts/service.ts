import { AxiosPromise } from 'axios';

import customFetch from '../../api/customFetch';
import { IAdvert } from '../../interfaces/advert.interface';

export const getUser = async () => {
  const user = await customFetch.get('/auth/me');
  console.log(user);
  return user;
};

export const createAdvert = async (advert: FormData) => {
  await customFetch.post('/v1/adverts', advert);
};

export const getAllAdverts = async (): AxiosPromise<IAdvert[]> => {
  const adverts = await customFetch.get('/v1/adverts');
  return adverts;
};
