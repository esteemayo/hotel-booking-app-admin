import { createContext, useContext, useReducer } from 'react';

import DarkModeReducer from './DarkModeReducer';
import { getFromStorage, setToStorage } from 'utils';
import * as actions from './DarkModeTypes';

const darkMode = getFromStorage('darkMode');

const INITIAL_STATE = {
  darkMode: darkMode ?? 'light',
};

const DarkModeContext = createContext(INITIAL_STATE);

const DarkModeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  const dark = (option) => {
    setToStorage('darkMode', option);
    dispatch({
      type: DARK,
      payload: option,
    });
  };

  const light = (option) => {
    setToStorage('darkMode', option);
    dispatch({
      type: LIGHT,
      payload: option,
    });
  };

  const toggle = (option) => {
    setToStorage('darkMode', option);
    dispatch({
      type: TOGGLE,
      payload: option,
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
