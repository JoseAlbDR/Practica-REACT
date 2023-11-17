import { Outlet, useNavigation } from 'react-router-dom';

import Wrapper from './styles/MainLayoutWrapper';

import { NavBar, Spinner } from '../../components';
import { UserProvider } from '../../context/UserContext';

const AdvertsLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <Wrapper>
      <UserProvider>
        <main className="main">
          <NavBar />
          <div className="main-page">
            {isLoading ? <Spinner /> : <Outlet />}
          </div>
        </main>
      </UserProvider>
    </Wrapper>
  );
};

export default AdvertsLayout;
