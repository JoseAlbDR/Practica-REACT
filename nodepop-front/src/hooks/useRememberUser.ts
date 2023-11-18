import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export const useRememberUser = (isLogged: boolean) => {
  const navigate = useNavigate();
  const { toggleLogged } = useAuth();

  useEffect(() => {
    if (isLogged) navigate('/adverts');
    toggleLogged(isLogged);
  }, [isLogged, navigate, toggleLogged]);

  return { isLogged };
};
