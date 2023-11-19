import { LoaderFunctionArgs, Outlet, useNavigation } from 'react-router-dom';

import Wrapper from './styles/MainLayoutWrapper';

import { NavBar, Spinner } from '../../components';
import { getAllAdverts, getTags } from '../adverts/service';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { AdvertsProvider } from '../../context/AdvertsContext';

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

const AdvertsLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <Wrapper>
      <main className="main">
        <NavBar />
        <div className="main-page">
          {isLoading ? (
            <Spinner />
          ) : (
            <AdvertsProvider>
              <Outlet />
            </AdvertsProvider>
          )}
        </div>
      </main>
    </Wrapper>
  );
};

export default AdvertsLayout;
