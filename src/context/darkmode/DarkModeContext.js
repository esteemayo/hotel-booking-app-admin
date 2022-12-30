import { createContext, useContext, useReducer } from 'react';

import DarkModeReducer from './DarkModeReducer';
import { getFromStorage, setToStorage } from 'utils';
import { DARK, LIGHT, TOGGLE } from './DarkModeTypes';

const darkMode = getFromStorage('darkMode');

const INITIAL_STATE = {
  darkMode: darkMode ?? 'light',
};

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  const dark = (option) => {
    setToStorage('darkMode', 'dark');
    dispatch({
      type: DARK,
      payload: option,
    });
  };

  const light = (option) => {
    setToStorage('darkMode', 'light');
    dispatch({
      type: LIGHT,
      payload: option,
    });
  };

  const toggle = () => {
    dispatch({
      type: TOGGLE,
    });
  };

  return (
    <DarkModeContext.Provider value={{ ...state, dark, light, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(DarkModeContext);
};

export { DarkModeProvider };
