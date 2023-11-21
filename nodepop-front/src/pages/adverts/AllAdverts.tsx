import { LoaderFunctionArgs } from 'react-router-dom';

import { getAllAdverts } from './service';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import AdvertsPage from './AdvertsPage';
import { AdvertsProvider } from '../../context/AdvertsContext';

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
  return (
    <AdvertsProvider>
      <AdvertsPage />
    </AdvertsProvider>
  );
};

export default AllAdverts;
