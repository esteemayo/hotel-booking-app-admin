import { createContext, useContext, useReducer } from 'react';

import * as actions from './DarkModeTypes';
import DarkModeReducer from './DarkModeReducer';
import { darkModeKey, getFromStorage, setToStorage } from 'utils';

const darkMode = getFromStorage(darkModeKey);

const INITIAL_STATE = {
  darkMode: darkMode ?? 'dark',
};

const DarkModeContext = createContext(INITIAL_STATE);

const DarkModeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  const dark = (option) => {
    setToStorage(darkModeKey, option);
    dispatch({
      type: actions.DARK,
      payload: option,
    });
  };

  const light = (option) => {
    setToStorage(darkModeKey, option);
    dispatch({
      type: actions.LIGHT,
      payload: option,
    });
  };

  const toggle = (option) => {
    setToStorage(darkModeKey, option);
    dispatch({
      type: actions.TOGGLE,
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
