import { toast } from 'react-toastify';
import { Outlet, redirect, useNavigation } from 'react-router-dom';

import Wrapper from './styles/MainLayoutWrapper';

import { NavBar, Spinner } from '../../components';
import { checkAuth } from '../../utils/checkAuth';
import { getUser } from '../adverts/service';

export const loader = async () => {
  try {
    checkAuth();
    const user = await getUser();
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
    toast.error('Not Authenticated, please signup or login');
    return redirect('/login');
  }
};

const AdvertsLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <Wrapper>
      <main className="main">
        <NavBar />
        <div className="main-page">{isLoading ? <Spinner /> : <Outlet />}</div>
      </main>
    </Wrapper>
  );
};

export default AdvertsLayout;
