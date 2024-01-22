import { Outlet, redirect } from 'react-router-dom';

import Wrapper from './styles/MainLayoutWrapper';

import { Navbar, Spinner } from '../../components';
import { toast } from 'react-toastify';

import { UserProvider } from '../../context/UserContext';
import { getUser } from './service';
import { getTags } from '../adverts/service';

import { CustomAxiosError } from '../../api/customFetch';
import { AxiosError } from 'axios';
import { useCustomNavigation } from '../../hooks/useCustomNavigation';
import { checkAuth } from '../../utils/checkAuth';
import { store } from '../../main';
import { advertsLoadTags } from '../../store/actions';

export const loader = async () => {
  checkAuth();
  try {
    // const user = await getUser();
    store.dispatch(advertsLoadTags());

    return null;
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
            {isLoading ? <Spinner /> : <Outlet />}
          </div>
        </main>
      </Wrapper>
    </UserProvider>
  );
};

export default AdvertsLayout;
