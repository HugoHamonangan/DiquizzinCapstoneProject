import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
}

interface ProtectedRouteProps {
  user: User | null;
  redirectPath?: string;
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  user,
  redirectPath = '/',
  children,
}) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
