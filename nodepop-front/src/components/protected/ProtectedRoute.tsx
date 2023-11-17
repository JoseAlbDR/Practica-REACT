import { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, redirect } from 'react-router-dom';
import { getUser } from './service';
import { toast } from 'react-toastify';
import { UserProvider } from '../../context/UserContext';
import { storage } from '../../utils';
import { setAuthorizationHeader } from '../../api/customFetch';

export const loader = async () => {
  const accessToken = storage.get('accessToken');

  if (accessToken) {
    setAuthorizationHeader(accessToken);
  }

  try {
    const user = await getUser();
    return user;
  } catch (error) {
    console.log(error);
    toast.error('Not Authenticated, please signup or login');
    return redirect('/login');
  }
};

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLogged } = useAuth();

  return (
    <>
      {isLogged ? (
        <UserProvider>{children}</UserProvider>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default ProtectedRoute;
