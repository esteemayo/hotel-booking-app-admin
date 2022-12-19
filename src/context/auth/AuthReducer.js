import * as actions from './AuthTypes';

const AuthReducer = (state, { payload, type }) => {
  switch (type) {
    case actions.LOGIN_START:
      return {
        ...state,
        isLoading: true,
      };

    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        user: payload,
      };

    case actions.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        user: null,
        isError: payload,
      };

    case actions.LOGOUT:
      return {
        ...state,
        user: null,
      };

    case actions.RESET:
      return {
        ...state,
        isSuccess: false,
        isLoading: false,
        isError: null,
      };

    default:
      return state;
  };
};

export default AuthReducer;
