import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export const useRememberUser = (isLogged: boolean) => {
  const navigate = useNavigate();
  const { initialLogged } = useAuth();

  useEffect(() => {
    if (initialLogged) navigate('/adverts');
  }, [initialLogged, navigate]);

  return { isLogged };
};
