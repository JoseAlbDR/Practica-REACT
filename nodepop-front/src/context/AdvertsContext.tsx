import { useLoaderData } from 'react-router-dom';
import { AdvertLoaderData, IAdvert } from '../interfaces/advert.interface';
import { ISearchParams } from '../interfaces/searchParams.interface';
import { ITags } from '../interfaces/tags.interface';
import { createContext, ReactNode, useContext } from 'react';
import { getMinMaxPrice } from '../utils/getMinMaxPrice';

interface AdvertsContextValues {
  adverts: IAdvert[];
  tags: ITags[];
  params: ISearchParams;
  min: number;
  max: number;
  isFirstAdvert: boolean;
}

const AdvertsContext = createContext<AdvertsContextValues | undefined>(
  undefined
);

const AdvertsProvider = ({ children }: { children: ReactNode }) => {
  const { adverts, tags, params } = useLoaderData() as AdvertLoaderData;

  const isFirstAdvert = adverts.length === 0;

  const { min, max } = getMinMaxPrice(adverts);

  let searchedAdverts = [...adverts];

  if (params.name)
    searchedAdverts = adverts.filter((advert) => {
      return params.name === 'all' ? advert : advert.name.includes(params.name);
    });

  if (params.type)
    searchedAdverts = searchedAdverts.filter((advert) => {
      return params.type === 'all'
        ? advert
        : advert.sale === (params.type === 'On sale');
    });

  if (params.tags)
    searchedAdverts = searchedAdverts.filter((advert) =>
      params.tags === 'all' ? advert : advert.tags.includes(params.tags)
    );

  if (params['min-price'] && params['max-price']) {
    searchedAdverts = searchedAdverts.filter((advert) => {
      return (
        advert.price >= params['min-price'] &&
        advert.price <= params['max-price']
      );
    });
  }

  return (
    <AdvertsContext.Provider
      value={{
        adverts: searchedAdverts,
        tags,
        params,
        min,
        max,
        isFirstAdvert,
      }}
    >
      {children}
    </AdvertsContext.Provider>
  );
};

const useAdverts = () => {
  const context = useContext(AdvertsContext);

  if (context === undefined)
    throw new Error('Adverts Context was used outside of AdvertsProvider');

  return context;
};

export { AdvertsProvider, useAdverts };
