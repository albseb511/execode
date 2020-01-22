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
  isAuth: true,
  isLoading: false,
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Nzk3NzkwNzQsInN1YiI6MSwiaWF0IjoxNTc5NjkyNjY5fQ.EJfDGq_kTb_m6M_0zhHypC42yGMuB5oKr8ZxuqhaCqQ",
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
      return {
        ...state,
        isAuth: true,
        token: payload.Authorization,
        isLoading: false
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        error: true,
        errorType: "login",
        errorMessage: "login failed"
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
        token: ""
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
        isRegistering: true
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isRegistering: false
      };
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        isRegistering: false,
        error: true,
        errorType: "register",
        errorMessage: "registration failed"
      };
    default:
      return state;
  }
};

export default reducer;
