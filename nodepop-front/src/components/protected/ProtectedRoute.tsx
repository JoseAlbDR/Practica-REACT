import { Outlet, redirect } from 'react-router-dom';
import { getUser } from './service';
import { toast } from 'react-toastify';
import { UserProvider } from '../../context/UserContext';
import { checkRememberMe } from '../../utils';
import { AxiosError } from 'axios';

export const loader = async () => {
  checkRememberMe();
  try {
    const user = await getUser();
    return user;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      if (error?.response?.status !== 401) {
        toast.error('There was an error, try again later');
      } else {
        toast.error('Unauthenticated, please login again');
      }
    }
    return redirect('/login');
  }
};

const ProtectedRoute = () => {
  return (
    <>
      <UserProvider>
        <Outlet />
      </UserProvider>
    </>
  );
};

export default ProtectedRoute;
