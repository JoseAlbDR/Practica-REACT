import React, { createContext } from 'react';
import { useState, useContext } from 'react';
import { storage } from '../utils';
import { logout } from '../pages/auth/service';
import { toast } from 'react-toastify';
import { NavigateFunction } from 'react-router-dom';

interface AuthContextValues {
  rememberMe: boolean;
  initialLogged: boolean;
  toggleRememberMe: (value: boolean) => void;
  onLogout: (navigate: NavigateFunction) => Promise<void>;
}

const AuthContext = createContext<AuthContextValues | undefined>(undefined);

const AuthProvider = ({
  initialLogged,
  remember,
  children,
}: {
  initialLogged: boolean;
  remember: boolean;
  children: React.ReactNode;
}): JSX.Element => {
  const [rememberMe, setRememberMe] = useState<boolean>(remember);

  const onLogout = async (navigate: NavigateFunction) => {
    try {
      await logout();
      toast.success(`User successfully logged out`);
      navigate('/login');
    } catch (error) {
      console.log(error);
      throw error;
    }
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
        initialLogged,
        rememberMe,
        toggleRememberMe,
        onLogout,
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
