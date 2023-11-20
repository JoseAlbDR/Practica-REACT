import { LoaderFunctionArgs } from 'react-router-dom';

import Wrapper from './styles/AllAdvertsWrapper';

import { Advert } from '../../components';

import SearchContainer from '../../components/search/SearchContainer';
import { useAdverts } from '../../context/AdvertsContext';
import { getAllAdverts } from './service';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import EmptyAdverts from '../../components/adverts/EmptyAdverts';
import ItemList from '../../components/shared/ItemList';

export const loader = async (data: LoaderFunctionArgs) => {
  const { request } = data;

  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const adverts = await getAllAdverts();

    return { adverts, params };
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      if (error?.response?.status === 401) return;
    }
    toast.error('Error loading adverts, try again later');
    throw new Error('Error loading adverts');
  }
};

const AllAdverts = () => {
  const { adverts, isFirstAdvert } = useAdverts();

  return (
    <Wrapper>
      {isFirstAdvert ? (
        <EmptyAdverts />
      ) : (
        <>
          <SearchContainer />
          <ItemList
            itemName="adverts"
            className="adverts"
            items={adverts}
            render={(advert) => {
              return <Advert key={advert.id} {...advert} />;
            }}
          />
        </>
      )}
    </Wrapper>
  );
};

export default AllAdverts;
