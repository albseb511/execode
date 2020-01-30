/*eslint-disable*/
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { loginUser, setRedirectUrl } from "../../redux/authentication/actions";
import { connect } from "react-redux";
import { tokenValidateUser } from "../../redux/authentication/actions";

const LoginPublic = ({
  loginUser,
  isAuth,
  token,
  error,
  errorMessage,
  isValidating,
  tokenValidateUser,
  redirectUrl,
  redirect
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
    keepLoggedIn: false
  });

  const onChange = e => {
    if (e.target.name === "keepLoggedIn") {
      setLoginState({ ...loginState, [e.target.name]: e.target.checked });
    } else {
      setLoginState({ ...loginState, [e.target.name]: e.target.value });
    }
  };

  const onLoginSubmit = e => {
    e.preventDefault();
    let payload = {
      email: loginState.email,
      password: loginState.password
    };
    loginUser(payload);
  };
  console.log(redirect,redirectUrl)
  return isAuth ? (
    <>
    {redirect? <Redirect to={`${redirectUrl}`} />:
    <Redirect to="/dashboard" />}
    </>
  ) : (
    <div className="mb-4 mt-4">
      <div>
        <h4 className="text-center">Login To Execode</h4>
        <form onSubmit={onLoginSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
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
          <input
            type="submit"
            className="btn btn-dark btn-raised  btn-block"
            value="Login"
          />
        </form>
        <div className="text-danger">{error && errorMessage}</div>
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
