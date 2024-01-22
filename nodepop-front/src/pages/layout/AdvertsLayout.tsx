import { Outlet } from 'react-router-dom';
import Wrapper from './styles/MainLayoutWrapper';
import { Navbar, Spinner } from '../../components';
import { useCustomNavigation } from '../../hooks/useCustomNavigation';

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
