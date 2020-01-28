import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE
} from "./actionTypes";

let localToken = localStorage.getItem("token");
if (localToken === "undefined") localToken = "";

const initState = {
  isAuth: false,
  isLoading: false,
  token: "",
  userType: "",
  email: "",
  isRegistering: false,
  registerSuccess: false,
  error: false,
  errorType: "",
  errorMessage: ""
};

const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        error: false,
        errorType: "",
        errorMessage: "",
        isLoading: true
      };
    case LOGIN_USER_SUCCESS:
      localStorage.setItem("token", payload.Authorization);
      localStorage.setItem("email", payload.email);
      localStorage.setItem("role", payload.role);
      return {
        ...state,
        isAuth: true,
        token: payload.Authorization,
        isLoading: false,
        userType: payload.role,
        email: payload.email
      };
    case LOGIN_USER_FAILURE:
      localStorage.setItem("token", "");
      localStorage.setItem("email", "");
      localStorage.setItem("role", "");
      return {
        ...state,
        isAuth: false,
        token: "",
        isLoading: false,
        error: true,
        errorType: "login",
        errorMessage: "something went wrong"
      };
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        error: false,
        errorType: "",
        errorMessage: ""
      };
    case LOGOUT_USER_SUCCESS:
      localStorage.setItem("token", "");
      return {
        ...state,
        isAuth: false,
        token: "",
        userType: "",
        email: ""
      };
    case LOGOUT_USER_FAILURE:
      return {
        ...state,
        error: true,
        errorType: "logout",
        errorMessage: "logout failed"
      };
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        error: false,
        errorType: "",
        errorMessage: "",
        isRegistering: true,
        registerSuccess: false
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isRegistering: false,
        registerSuccess: true
      };
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        isRegistering: false,
        error: true,
        errorType: "register",
        errorMessage: "registration failed",
        registerSuccess: false
      };
    default:
      return state;
  }
};

export default reducer;
