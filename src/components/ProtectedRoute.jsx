import { Navigate } from 'react-router-dom';
import { useUserContext } from '../hooks/contextHooks';

const ProtectedRoute = ({ children }) => {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
