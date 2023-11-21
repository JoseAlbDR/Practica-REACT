import { createContext, useContext } from 'react';
import { IUser } from '../interfaces/auth.interfaces';
import { ReactNode } from 'react';
import { useLoaderData } from 'react-router-dom';

interface UserContextValues {
  user: IUser;
}

const UserContext = createContext<UserContextValues | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const { user } = useLoaderData() as { user: IUser };

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined)
    throw new Error('UserContext was used outside of UserProvider');

  return context;
};

export { UserProvider, useUser };
