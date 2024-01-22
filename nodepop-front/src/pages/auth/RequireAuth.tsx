import { Navigate, useLocation } from 'react-router';
import { getAuth } from '../../store/selectors';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { checkAuth } from '../../utils/checkAuth';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { isLoggedIn } = useSelector(getAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default RequireAuth;
