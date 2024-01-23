import customFetch from '../../api/customFetch';
import { IAdvert } from '../../interfaces/advert.interface';
import { ITags } from '../../interfaces/tags.interface';

export const createAdvert = async (advert: FormData): Promise<IAdvert> => {
  const sale = advert.get('sale');

  const forSale = sale === 'on sale' ? 'true' : 'false';

  advert.set('sale', forSale);
  const newAdvert = (await customFetch.post('/v1/adverts', advert)) as IAdvert;
  return new Promise((resolve) => resolve(newAdvert));
};

export const getAllAdverts = async (): Promise<IAdvert[]> => {
  const adverts = (await customFetch.get('/v1/adverts')) as IAdvert[];
  return new Promise((resolve) => {
    resolve(adverts);
  });
};

export const getTags = async (): Promise<ITags[]> => {
  const tags = (await customFetch.get('/v1/adverts/tags')) as ITags[];
  return new Promise((resolve) => {
    resolve(tags);
  });
};

export const deleteAdvert = async (id: string) => {
  await customFetch.delete(`/v1/adverts/${id}`);
};

export const getAdvert = async (id: string): Promise<IAdvert> => {
  const advert = (await customFetch.get(`/v1/adverts/${id}`)) as IAdvert;

  return new Promise((resolve) => {
    resolve(advert);
  });
};
