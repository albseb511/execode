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
  TOKEN_VALIDATE_FAILURE,
  REDIRECT_URL,
  RESET_REDIRECT_URL
} from "./actionTypes";
import axios from "../../utils/axiosInterceptor";

export const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST
});

export const loginUserSuccess = payload => ({
  type: LOGIN_USER_SUCCESS,
  payload
});

export const loginUserFail = () => ({
  type: LOGIN_USER_FAILURE
});

export const loginUser = payload => {
  return dispatch => {
    dispatch(loginUserRequest());
    return axios
      .post("/login", {
        email: payload.email,
        password: payload.password
      })
      .then(res => {
        dispatch(loginUserSuccess(res.data));
      })
      .catch(() => dispatch(loginUserFail()));
  };
};

loginUser({ email: "test", password: "test" });

// REGISTER

export const registerUserRequest = () => ({
  type: REGISTER_USER_REQUEST
});

export const registerUserSuccess = payload => ({
  type: REGISTER_USER_SUCCESS,
  payload
});

export const registerUserFail = () => ({
  type: REGISTER_USER_FAILURE
});

export const registerUser = payload => {
  return dispatch => {
    dispatch(registerUserRequest());
    return axios
      .post("/signup", {
        email: payload.email,
        name: payload.name,
        password: payload.password
      })
      .then(res => {
        dispatch(registerUserSuccess(res));
      })
      .catch(() => dispatch(registerUserFail()));
  };
};

export const logoutUserRequest = () => ({
  type: LOGOUT_USER_REQUEST
});

export const logoutUserSuccess = payload => ({
  type: LOGOUT_USER_SUCCESS,
  payload
});

export const logoutUserFail = () => ({
  type: LOGOUT_USER_FAILURE
});

export const logoutUser = payload => {
  return dispatch => {
    dispatch(logoutUserRequest());
    return axios
      .post(
        "/logout",
        {},
        {
          headers: {
            Authorization: payload.token
          }
        }
      )
      .then(res => {
        dispatch(logoutUserSuccess(res));
      })
      .catch(() => dispatch(logoutUserFail()));
  };
};

export const tokenValidateRequest = () => ({
  type: TOKEN_VALIDATE_REQUEST
});

export const tokenValidateSuccess = payload => ({
  type: TOKEN_VALIDATE_SUCCESS,
  payload
});

export const tokenValidateFail = () => ({
  type: TOKEN_VALIDATE_FAILURE
});

export const tokenValidateUser = payload => {
  return dispatch => {
    dispatch(tokenValidateRequest());
    return axios
      .get("/validate", {
        headers: {
          Authorization: payload
        }
      })
      .then(res =>
        res.data.success
          ? dispatch(tokenValidateSuccess(res))
          : dispatch(tokenValidateFail())
      )
      .catch(() => dispatch(tokenValidateFail()));
  };
};

export const setRedirectUrl = payload => ({
  type: REDIRECT_URL,
  payload
})

export const resetRedirectUrl = () => ({
  type: RESET_REDIRECT_URL,
})
