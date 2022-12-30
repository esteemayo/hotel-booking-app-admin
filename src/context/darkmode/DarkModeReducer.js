import { DARK, LIGHT, TOGGLE } from './DarkModeTypes';

const DarkModeReducer = (state, { payload, type }) => {
  if (type === LIGHT) {
    return {
      ...state,
      darkMode: payload,
    };
  }

  if (type === DARK) {
    return {
      ...state,
      darkMode: payload,
    };
  }

  if (type === TOGGLE) {
    return {
      ...state,
      darkMode: payload,
    };
  }

  throw new Error('No matching action type');
};

export default DarkModeReducer;
