import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
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
    toast.info('Not Authenticated, please signup or login');
    return null;
  }
};

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const user = useLoaderData();

  return (
    <Wrapper>
      <main className="main">
        <NavBar />
        <div className="main-page">
          {isLoading ? <Spinner /> : <Outlet context={user} />}
        </div>
      </main>
    </Wrapper>
  );
};

export default AppLayout;
