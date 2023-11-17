import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet, redirect } from 'react-router-dom';
import { getUser } from './service';
import { toast } from 'react-toastify';
import { UserProvider } from '../../context/UserContext';
import { checkRememberMe } from '../../utils';

export const loader = async () => {
  checkRememberMe();
  try {
    const user = await getUser();
    return user;
  } catch (error) {
    console.log(error);
    toast.error('Not Authenticated, please signup or login');
    return redirect('/login');
  }
};

const ProtectedRoute = () => {
  const { isLogged } = useAuth();

  return (
    <>
      {isLogged ? (
        <UserProvider>
          <Outlet />
        </UserProvider>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default ProtectedRoute;
