import { Navigate } from 'react-router-dom';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const AuthRoute = ({ children }) => {
  const { user } = useGlobalAuthContext();

  return user ? <LoadingToRedirect /> : children;
};

export default AuthRoute;
