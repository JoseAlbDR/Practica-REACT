import { Outlet, redirect } from 'react-router-dom';

import Wrapper from './styles/MainLayoutWrapper';

import { Navbar, Spinner } from '../../components';
import { toast } from 'react-toastify';

import { CustomAxiosError } from '../../api/customFetch';
import { AxiosError } from 'axios';
import { useCustomNavigation } from '../../hooks/useCustomNavigation';
import { checkAuth } from '../../utils/checkAuth';

import { advertsLoadTags } from '../../store/actions';
import { Dispatch } from 'redux';

export const loader = (store: { dispatch: Dispatch }) => async () => {
  checkAuth();
  try {
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
    <Wrapper>
      <main className="main">
        <Navbar />
        <div className="main-page">{isLoading ? <Spinner /> : <Outlet />}</div>
      </main>
    </Wrapper>
  );
};

export default AdvertsLayout;
