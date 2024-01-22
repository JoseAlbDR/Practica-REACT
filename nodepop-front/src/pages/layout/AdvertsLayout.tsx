import { Outlet, redirect } from 'react-router-dom';

import Wrapper from './styles/MainLayoutWrapper';

import { Navbar, Spinner } from '../../components';
import { toast } from 'react-toastify';
import { TagsProvider } from '../../context/TagsContext';
import { UserProvider } from '../../context/UserContext';
import { getUser } from './service';
import { getTags } from '../adverts/service';

import { CustomAxiosError } from '../../api/customFetch';
import { AxiosError } from 'axios';
import { checkAuth } from '../../utils/checkAuth';
import { useCustomNavigation } from '../../hooks/useCustomNavigation';

export const loader = async () => {
  // Check for token in LS
  checkAuth();

  try {
    const user = await getUser();
    const tags = await getTags();
    return { user, tags };
  } catch (error) {
    console.log({ error });
    if (error instanceof CustomAxiosError && error.status === 401) {
      toast.error(error.message);
    }
    if (error instanceof AxiosError) {
      if (error.code === 'ERR_NETWORK') {
        throw error;
      } else {
        toast.error(error?.response?.data?.msg);
      }
    }
    return redirect('/login');
  }
};

const AdvertsLayout = () => {
  const { isLoading } = useCustomNavigation();

  return (
    <UserProvider>
      <Wrapper>
        <main className="main">
          <Navbar />
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
    </UserProvider>
  );
};

export default AdvertsLayout;
