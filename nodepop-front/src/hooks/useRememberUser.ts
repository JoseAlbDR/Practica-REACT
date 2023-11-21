import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useAuth } from '../context/AuthContext';

export const useRememberUser = (isLogged: boolean) => {
  const navigate = useNavigate();
  const { initialLogged } = useAuth();

  useEffect(() => {
    if (initialLogged) navigate('/adverts');
  }, [initialLogged, navigate]);

  return { isLogged };
};
