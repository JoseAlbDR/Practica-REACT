import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export const useRememberUser = (isLogged: boolean) => {
  const navigate = useNavigate();
  const { toggleLogged } = useAuth();

  useEffect(() => {
    console.log('useEffect');
    toggleLogged(isLogged);
    if (isLogged) navigate('/adverts');
  }, [isLogged, navigate, toggleLogged]);

  return { isLogged };
};
