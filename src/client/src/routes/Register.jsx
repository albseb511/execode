/*eslint-disable*/
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { registerUser } from "../redux/authentication/actions";
import { connect } from "react-redux";

const Register = ({
  token,
  registerUser,
  isAuth,
  isRegistering,
  registerSuccess,
  error,
  errorType,
  errorMessage
}) => {
  const [signupState, setSignupState] = useState({
    email: "",
    name: "",
    password: ""
  });

  const onChange = e => {
    if (e.target.name === "keepLoggedIn") {
      setSignupState({ ...signupState, [e.target.name]: e.target.checked });
    } else {
      setSignupState({ ...signupState, [e.target.name]: e.target.value });
    }
  };

  const onRegisterSubmit = e => {
    e.preventDefault();
    let payload = {
      email: signupState.email,
      name: signupState.name,
      password: signupState.password,
      token
    };
    registerUser(payload);
  };

  return isAuth ? (
    <Redirect to="/dashboard" />
  ) : (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 py-5">
          <div className="mt-4 mb-4 text-center">
            <h4>Create Account</h4>
          </div>
          <form onSubmit={onRegisterSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter Full Name"
                className="form-control"
                value={signupState.name}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter Email"
                className="form-control"
                aria-describedby="emailHelp"
                value={signupState.email}
                onChange={onChange}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter Password"
                className="form-control"
                value={signupState.password}
                onChange={onChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-dark btn-raised btn-block text-uppercase"
            >
              <i className="fas fa-plus-square" /> Register
            </button>
          </form>
          {isRegistering && (
            <div className="text-center mt-4">
              <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
          {error && errorType == "register" ? (
            <div className="text-danger">{errorMessage}</div>
          ) : (
            registerSuccess && (
              <div className="text-center mt-3">
                <span>
                  Successfully Registered Please Login Your Email and Password
                  <Link className="nav-link  text-success" to="/login">
                    Login
                  </Link>
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuth: state.authReducer.isAuth,
  isLoading: state.authReducer.isLoading,
  token: state.authReducer.token,
  isRegistering: state.authReducer.isRegistering,
  registerSuccess: state.authReducer.registerSuccess,
  error: state.authReducer.error,
  errorType: state.authReducer.errorType,
  errorMessage: state.authReducer.errorMessage
});

const mapDispatchToProps = dispatch => ({
  registerUser: payload => dispatch(registerUser(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
