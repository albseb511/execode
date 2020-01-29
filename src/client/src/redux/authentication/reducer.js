import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  TOKEN_VALIDATE_REQUEST,
  TOKEN_VALIDATE_SUCCESS,
  TOKEN_VALIDATE_FAILURE
} from "./actionTypes";

function getUserInfo() {
  let token = localStorage.getItem("token");
  let email = localStorage.getItem("email");
  let userType = localStorage.getItem("role");
  if (!token || !email || !userType) {
    email = "";
    token = "";
    userType = "";
  }
  return [token, email, userType];
}

const [token, email, userType] = getUserInfo();
console.log("loading store", token, email, userType);
const initState = {
  isAuth: false,
  isLoading: false,
  isValidating: false,
  token,
  userType,
  email,
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
      localStorage.setItem("email", "");
      localStorage.setItem("role", "");
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
    case TOKEN_VALIDATE_REQUEST:
      return {
        ...state,
        isValidating: true,
        error: false,
        errorType: "",
        errorMessage: ""
      };
    case TOKEN_VALIDATE_SUCCESS:
      return {
        ...state,
        isValidating: false,
        isAuth: true
      };
    case TOKEN_VALIDATE_FAILURE:
      localStorage.setItem("token", "");
      localStorage.setItem("email", "");
      localStorage.setItem("role", "");
      return {
        ...state,
        token: "",
        userType: "",
        email: "",
        isAuth: false,
        isValidating: false,
        error: true,
        errorType: "token_invalid",
        errorMessage: "session has expired or invalid. Please login in again"
      };
    default:
      return state;
  }
};

export default reducer;
