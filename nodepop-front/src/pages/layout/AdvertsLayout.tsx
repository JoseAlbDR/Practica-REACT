import { Outlet, useNavigation } from 'react-router-dom';

import Wrapper from './styles/MainLayoutWrapper';

import { NavBar, Spinner } from '../../components';

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
