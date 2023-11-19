import React, { createContext } from 'react';
import { useState, useContext } from 'react';
import { storage } from '../utils';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';
import { logout } from '../pages/auth/service';

interface AuthContextValues {
  isLogged: boolean;
  toggleLogged: (value: boolean) => void;
  rememberMe: boolean;
  toggleRememberMe: (value: boolean) => void;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValues | undefined>({
  isLogged: false,
  toggleLogged: () => {},
  rememberMe: false,
  toggleRememberMe: () => {},
  logoutUser: async () => {},
});

const AuthProvider = ({
  initialLogged,
  remember,
  children,
}: {
  initialLogged: boolean;
  remember: boolean;
  children: React.ReactNode;
}): JSX.Element => {
  const [isLogged, setIsLogged] = useState<boolean>(initialLogged);
  const [rememberMe, setRememberMe] = useState<boolean>(remember);

  const logoutUser = async () => {
    try {
      await logout();
      toggleLogged(false);
      toast.success(`User successfully logged out`);
      redirect('/login');
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const toggleLogged = (value: boolean) => {
    setIsLogged(value);
    return;
  };

  const toggleRememberMe = (value: boolean) => {
    setRememberMe(value);

    value
      ? storage.set('rememberUser', 'true')
      : storage.remove('rememberUser');

    return;
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        toggleLogged,
        rememberMe,
        toggleRememberMe,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error('Auth Context was used outside of AuthProvider');

  return context;
};

export { AuthProvider, useAuth };
