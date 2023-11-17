import { AxiosPromise } from 'axios';

import customFetch from '../../api/customFetch';
import { IAdvert } from '../../interfaces/advert.interface';

export const createAdvert = async (advert: FormData) => {
  const sale = advert.get('sale');

  const forSale = sale === 'on sale' ? 'true' : 'false';

  advert.set('sale', forSale);

  await customFetch.post('/v1/adverts', advert);
};

export const getAllAdverts = async (): AxiosPromise<IAdvert[]> => {
  const adverts = await customFetch.get('/v1/adverts');
  return adverts;
};

export const getTags = async () => {
  const tags = await customFetch.get('/v1/adverts/tags');
  return tags;
};
