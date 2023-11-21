import { LoaderFunctionArgs } from 'react-router-dom';
import AdvertsPage from './AdvertsPage';
import { getAllAdverts } from './service';

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
    throw error;
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
