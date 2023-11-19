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
}

const AdvertsContext = createContext<AdvertsContextValues | undefined>(
  undefined
);

const AdvertsProvider = ({ children }: { children: ReactNode }) => {
  const { adverts, tags, params } = useLoaderData() as AdvertLoaderData;

  const { min, max } = getMinMaxPrice(adverts);

  console.log(params);

  return (
    <AdvertsContext.Provider value={{ adverts, tags, params, min, max }}>
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
