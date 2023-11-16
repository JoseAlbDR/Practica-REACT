import { Outlet, redirect, useNavigation } from 'react-router-dom';
import { getUser } from '../adverts/service';
import { toast } from 'react-toastify';
import Wrapper from './styles/MainLayoutWrapper';
import { Spinner } from '../../components';
import NavBar from '../../components/navBar/NavBar';

export const loader = async () => {
  try {
    const user = await getUser();
    return user;
  } catch (error) {
    console.log(error);
    toast.error('Not Authenticated, please signup or login');
    return redirect('/login');
  }
};

const AppLayout = () => {
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

export default AppLayout;
