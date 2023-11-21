import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import { getUser } from './service';
import { toast } from 'react-toastify';
import { UserProvider } from '../../context/UserContext';
import { checkRememberMe } from '../../utils';

import { CustomAxiosError } from '../../interfaces/error.interfaces';
import { IUser } from '../../interfaces/auth.interfaces';

export const loader = async () => {
  checkRememberMe();
  try {
    const user = await getUser();
    return user;
  } catch (error) {
    console.log(error);
    toast.error((error as CustomAxiosError).message);
    return redirect('/login');
  }
};

const ProtectedRoute = () => {
  const user = useLoaderData() as IUser;
  console.log(user);
  return (
    <>
      {user && (
        <UserProvider>
          <Outlet />
        </UserProvider>
      )}
    </>
  );
};

export default ProtectedRoute;
