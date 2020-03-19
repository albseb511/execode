/*eslint-disable*/
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { loginUser, setRedirectUrl } from "../../redux/authentication/actions";
import { connect } from "react-redux";
import { tokenValidateUser } from "../../redux/authentication/actions";

const LoginPublic = ({
  contestId,
  loginUser,
  isAuth,
  token,
  error,
  errorMessage,
  isValidating,
  tokenValidateUser,
  redirectUrl,
  redirect,
  isLoading
}) => {
  if (token != "" && !isValidating && !isAuth) {
    tokenValidateUser(token);
    if (isValidating) {
      return <div>Validating</div>;
    }
  }
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
    keepLoggedIn: false,
    loading: true
  });

  const onChange = e => {
    if (e.target.name === "keepLoggedIn") {
      setLoginState({ ...loginState, [e.target.name]: e.target.checked });
    } else {
      setLoginState({ ...loginState, [e.target.name]: e.target.value });
    }
  };
  const registerUserRequest = e => {
    e.preventDefault();
    let payload = {
      email: loginState.email,
      password: loginState.password,
      token
    };
    loginUser(payload);
  };
  return isAuth ? (
    <div>
      {redirect ? (
        <Redirect to={`${redirectUrl}`} />
      ) : (
        <Redirect to="/dashboard" />
      )}
    </div>
  ) : (
    <div className="row">
      <div className="col-md-8 offset-md-2 py-5">
        <div className="mb-4 mt-4">
          <div>
            <h4 className="text-center">Login</h4>
            <form onSubmit={registerUserRequest}>
              <div className="form-group mb-3">
                <label htmlFor="Email">Email</label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="form-control"
                  name="email"
                  value={loginState.username}
                  onChange={onChange}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="form-control"
                  name="password"
                  value={loginState.password}
                  onChange={onChange}
                />
              </div>
              <div className="form-group mt-2">
                <span>
                  <input
                    type="checkbox"
                    name="keepLoggedIn"
                    defaultValue={loginState.keepLoggedIn}
                    onChange={onChange}
                  />
                  <small className="text-muted ml-2">Keep me logged in</small>
                </span>
              </div>
              <button
                type="submit"
                className="btn btn-dark btn-raised btn-block text-uppercase"
              >
                <i className=" fas fa-sign-in-alt" /> Login
              </button>
            </form>
            {isLoading && (
              <div className="text-center mt-4">
                <div className="spinner-border text-success" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            <div className="mt-3">
              <span className="text-center text-danger">
                {error && errorMessage}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuth: state.authReducer.isAuth,
  isLoading: state.authReducer.isLoading,
  token: state.authReducer.token,
  error: state.authReducer.error,
  errorMessage: state.authReducer.errorMessage,
  isValidating: state.authReducer.isValidating,
  redirectUrl: state.authReducer.redirectUrl,
  redirect: state.authReducer.redirect
});

const mapDispatchToProps = dispatch => ({
  loginUser: payload => dispatch(loginUser(payload)),
  tokenValidateUser: payload => dispatch(tokenValidateUser(payload)),
  setRedirectUrl: payload => dispatch(setRedirectUrl(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPublic);
