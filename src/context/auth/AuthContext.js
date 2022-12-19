import { createContext, useContext } from 'react';

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
};

const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({ children }) => {
  return <AuthContext.Provider value={{ 'hello': 'world' }}>{children}</AuthContext.Provider>
};

export const useGlobalAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider };
