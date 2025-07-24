import { Navigate } from 'react-router';
import { useAppSelector } from '../provider/store';
import type { JSX } from 'react';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = useAppSelector(state => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
