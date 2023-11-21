import { Outlet, useNavigation } from 'react-router-dom';

import Wrapper from './styles/MainLayoutWrapper';

import { NavBar, Spinner } from '../../components';
import { getTags } from '../adverts/service';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { TagsProvider } from '../../context/TagsContext';

export const loader = async () => {
  try {
    const tags = await getTags();

    return { tags };
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
            <TagsProvider>
              <Outlet />
            </TagsProvider>
          )}
        </div>
      </main>
    </Wrapper>
  );
};

export default AdvertsLayout;
