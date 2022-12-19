import * as actions from './AuthTypes';

const AuthReducer = (state, { payload, type }) => {
  switch (type) {
    case actions.LOGIN_START:
      return {
        ...state,
        loading: true,
      };

    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
      };

    case actions.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
        error: payload.message,
      };

    case actions.LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  };
};

export default AuthReducer;
