import { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

type ContextType = {
  rememberLogin: boolean;
  setRememberLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppLayout = () => {
  const [rememberLogin, setRememberLogin] = useState<boolean>(false);

  return (
    <>
      <Outlet context={[rememberLogin, setRememberLogin]} />
    </>
  );
};

export const useRememberLogin = () => {
  return useOutletContext<ContextType>();
};

export default AppLayout;
