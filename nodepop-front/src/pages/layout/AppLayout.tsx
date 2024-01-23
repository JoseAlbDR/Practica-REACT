import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getUi } from '../../store/selectors';
import ErrorPage from '../error/ErrorPage';

const AppLayout = () => {
  const { error } = useSelector(getUi);

  if (error) return <ErrorPage />;

  return (
    <>
      <Outlet />
    </>
  );
};

export default AppLayout;
