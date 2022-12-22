import LoadingToRedirect from './LoadingToRedirect';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useGlobalAuthContext();

  return !user ? <LoadingToRedirect /> : children;
};

export default ProtectedRoute;
