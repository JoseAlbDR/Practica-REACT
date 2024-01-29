import { Outlet } from 'react-router-dom';
import Wrapper from './styles/MainLayoutWrapper';
import { Navbar, Spinner } from '../../components';
import { useSelector } from 'react-redux';
import { getUi } from '../../store/selectors';

const AdvertsLayout = () => {
  const { isFetching } = useSelector(getUi);

  return (
    <Wrapper>
      <main className="main">
        <Navbar />
        <div className="main-page">{isFetching ? <Spinner /> : <Outlet />}</div>
      </main>
    </Wrapper>
  );
};

export default AdvertsLayout;
