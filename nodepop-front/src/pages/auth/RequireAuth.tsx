import { Navigate, useLocation } from 'react-router';
import { getAuth } from '../../store/selectors';
import { useSelector } from 'react-redux';
import React from 'react';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { isLoggedIn } = useSelector(getAuth);

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default RequireAuth;
