/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ location: { pathname }, userType, logoutUser, token }) => {
  let adminLinks = null;
  // dangerous, use from redux store
  if (pathname.startsWith("/dashboard/admin")) {
    adminLinks = [
      { name: "Contests", path: "all-contest" },
      { name: "Create Contest", path: "create-contest" },
      { name: "Create Challenge", path: "create-challenge" }
    ].map(link => (
      <li role="presentation" className="nav-item">
        <Link
          className="nav-link text-light"
          to={`/dashboard/admin/${link.path}`}
        >
          {link.name}
        </Link>
      </li>
    ));
  }
  const handleLogout = () => {
    logoutUser(token);
  };
  return (
    <div>
      <nav className="navbar fixed navbar-dark bg-dark navbar-expand-md mb-4">
        <div className="container">
          <div className="navbar-brand">
            <Link className="nav-link text-light" to="/dashboard">
              <i className="fas fa-file-code" />
              <span className="text-monospace font-weight-bold"> ExeCode</span>
            </Link>
          </div>
          <div
            data-toggle="collapse"
            className="navbar-toggler"
            data-target="#navcol-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon" />
          </div>
          <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="nav navbar-nav ml-auto">
              {userType === "admin" && adminLinks}
              <li role="presentation" className="nav-item">
                <Link className="nav-link text-light" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              {userType === "admin" && (
                <li role="presentation" className="nav-item">
                  <Link className="nav-link text-light" to="/dashboard/admin">
                    Admin
                  </Link>
                </li>
              )}
              <li role="presentation" className="nav-item">
                <Link className="nav-link text-light" to="/dashboard/profile">
                  Profile
                </Link>
              </li>
              <li role="presentation" className="nav-item">
                <div className="nav-link text-light" onClick={handleLogout}>
                  Logout
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
