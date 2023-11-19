import { IAdvert } from '../interfaces/advert.interface';

export const getMinMaxPrice = (adverts: IAdvert[]) => {
  const { min, max } = adverts.reduce(
    (acc, advert) => {
      const { min: currentMin, max: currentMax } = acc;
      acc.max = currentMax < advert.price ? advert.price : currentMax;
      acc.min = currentMin > advert.price ? advert.price : currentMin;
      return acc;
    },
    { min: Infinity, max: -Infinity }
  );

  return { min, max };
};
