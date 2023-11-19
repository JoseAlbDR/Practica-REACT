import { Link, LoaderFunctionArgs } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import Wrapper from './styles/AllAdvertsWrapper';

import { AdvertLoaderData } from '../../interfaces/advert.interface';
import { Advert } from '../../components';
import { getAllAdverts, getTags } from './service';
import SearchContainer from '../../components/search/SearchContainer';

export const loader = async (data: LoaderFunctionArgs) => {
  const { request } = data;

  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const adverts = await getAllAdverts();
    const tags = await getTags();

    return { adverts, tags, params };
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
  const { adverts } = useLoaderData() as AdvertLoaderData;

  return (
    <Wrapper>
      {adverts.length === 0 ? (
        <h2>
          Currently there are no Adverts, do you want to{' '}
          <Link to="new" className="create-link">
            Create One?
          </Link>
        </h2>
      ) : (
        <div className="adverts">
          <SearchContainer />
          {adverts.map((advert) => {
            return <Advert key={advert.id} {...advert} />;
          })}
        </div>
      )}
    </Wrapper>
  );
};

export default AllAdverts;
