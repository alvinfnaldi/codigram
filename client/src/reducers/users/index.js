/* eslint-disable default-case */
import { LOGIN_USER, REGISTER_USER } from "../../actions/userAction";

const initialState = {
  loginUserResult: false,
  loginUserLoading: false,
  loginUserError: false,

  registerUserResult: false,
  registerUserLoading: false,
  registerUserError: false,
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginUserResult: action.payload.data,
        loginUserLoading: action.payload.loading,
        loginUserError: action.payload.errorMessage,
      };

    case REGISTER_USER:
      return {
        ...state,
        registerUserResult: action.payload.data,
        registerUserLoading: action.payload.loading,
        registerUserError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default posts;
