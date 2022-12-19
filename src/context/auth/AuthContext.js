import jwtDecode from 'jwt-decode';
import { createContext, useContext, useReducer } from 'react';

import * as actions from './AuthTypes';
import AuthReducer from './AuthReducer';
import { getJwt } from 'services/authService';
import { clearFromStorage, getFromStorage, tokenKey } from 'utils/index';

const token = getJwt();
const user = getFromStorage(tokenKey);

const INITIAL_STATE = {
  user: user ?? null,
  loading: false,
  error: null,
};

if (token) {
  const decoded = jwtDecode(token);
  const expiryDate = Date.now();

  if (expiryDate > decoded.exp * 1000) {
    clearFromStorage();
    INITIAL_STATE.user = null;
  }
}

const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const loginStart = () => {
    dispatch({
      type: actions.LOGIN_START,
    });
  };

  const loginSuccess = (credentials) => {
    dispatch({
      type: actions.LOGIN_SUCCESS,
      payload: credentials,
    });
  };

  const loginFailure = (error) => {
    dispatch({
      type: actions.LOGIN_FAILURE,
      payload: error,
    });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      loginFailure,
      loginStart,
      loginSuccess,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider };
