import * as actions from './DarkModeTypes';

const DarkModeReducer = (state, { payload, type }) => {
  switch (type) {
    case actions.LIGHT:
      return {
        ...state,
        darkMode: payload,
      };

    case actions.DARK:
      return {
        ...state,
        darkMode: payload,
      };

    case TOGGLE:
      return {
        ...state,
        darkMode: payload,
      };

    default:
      return state;
  };
};

export default DarkModeReducer;
