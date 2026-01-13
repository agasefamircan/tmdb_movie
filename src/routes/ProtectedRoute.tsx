import type { JSX } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const sessionId = useSelector((state: RootState) => state.auth.sessionId);

  if (!sessionId) {
    return <Navigate to="/login" />;
  }

  return children;
};
export default ProtectedRoute;
