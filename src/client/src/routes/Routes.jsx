/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/newline-after-import */
import React from "react";
import { Route, Switch } from "react-router-dom";
import DashboardRoutes from "./DashboardRoutes";
import Login from "./Login";
import Register from "./Register";
import About from "./About";
import Contact from "./Contact";
import Home from "./Home";
import NavBarPublic from "./NavbarPublic";
import NoMatch from "./NoMatch";
import ContestRegister from "./Dashboard/User/Contest/ContestRegister";

// eslint-disable-next-line no-unused-vars
const Routes = () => {
  return (
    <div>
      <Route path="/" component={NavBarPublic} />
      <Switch>
        <Route path="/" exact render={() => <Home />} />
        <Route
          path="/dashboard"
          render={({ location }) => (
            <DashboardRoutes path={location.pathname} />
          )}
        />
        <Route path="/execode/contest/:id" render={() => <ContestRegister />} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/register" render={() => <Register />} />
        <Route path="/about" render={() => <About />} />
        <Route path="/contact" render={() => <Contact />} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};

export default Routes;
