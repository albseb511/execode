/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import UserDashboard from "./Dashboard/User/UserDashboard";
import posthog from "posthog-js";
import Settings from "./Dashboard/Settings";
import Profile from "./Dashboard/Profile";
import Reports from "./Dashboard/Reports";
import NavBar from "./Dashboard/NavBar";
import TodayContest from "./Dashboard/User/Contest/TodayContest";
// import ContestChallenge from "./Dashboard/User/Challenge/ContestChallenge";
import SingleChallenge from "./Dashboard/User/Challenge/SingleChallenge";
import SubmitCode from "./Dashboard/User/Challenge/SubmitCode";
import AdminDashboard from "./Dashboard/Admin/AdminDashboard";
import AllContest from "./Dashboard/Admin/Contest/AllContest";
import ContestLeaderboard from "./Dashboard/Admin/Contest/ContestLeaderboard";
import UserSubmissions from "./Dashboard/Admin/Contest/UserSubmissions";
import UserSubmissionsEvents from "./Dashboard/Admin/Contest/UserSubmissionsEvents";
import CreateChallenge from "./Dashboard/Admin/CreateChallenge/CreateChallenge";
import CreateContest from "./Dashboard/Admin/CreateContest/CreateContest";
import ContestDetails from "./Dashboard/User/Contest/ContestDetails";
import ContestLeaderboardUser from "./Dashboard/User/Contest/ContestLeaderboardUser";
import AdminRoutes from "../components/common/AdminRoutes";
import AdminSettings from "./Dashboard/Admin/CPanel/AdminSettings";
import EditContestDetails from "./Dashboard/Admin/CreateContest/EditContestDetails";
import CreateUsers from "./Dashboard/Admin/CPanel/CreateUsers";
import ViewUsers from "./Dashboard/Admin/CPanel/ViewUsers";

import {
  logoutUser,
  setRedirectUrl,
  resetRedirectUrl,
  tokenValidateUser
} from "../redux/authentication/actions";
import ErrorBoundary from "../components/common/ErrorBoundary";
import ViewSubmissions from "./Dashboard/User/Contest/ViewSubmissions";
import AllChallenges from "./Dashboard/Admin/Challenge/AllChallenges";
import ViewChallenge from "./Dashboard/Admin/Challenge/ViewChallenge";
import AuthenticatingIndicator from "../components/common/Activity Indicators/AuthenticatingIndicator";
import NoMatch from "./NoMatch";

const DashboardRoutes = ({
  isAuth,
  token,
  userType,
  email,
  logoutUser,
  path,
  validateUser,
  error,
  isLoadingAdmin,
  isLoadingAuth,
  isValidating,
  isLoadingUser
}) => {
  const isLoadingCondition =
    isLoadingAdmin || isLoadingAuth || isValidating || isLoadingUser;
  if (!isAuth && !isValidating) {
    // if(error){
    // return <Redirect to="/login" />
    // }
    validateUser(token);
  }
  if (isAuth) {
    posthog.identify(email);
    posthog.people.set({
      email
    });
  }
  return isAuth ? (
    <>
      <Route
        path="/dashboard"
        render={({ location }) => (
          <ErrorBoundary>
            <NavBar
              location={location}
              email={email}
              token={token}
              userType={userType}
              logoutUser={logoutUser}
            />
          </ErrorBoundary>
        )}
      />
      {isLoadingCondition && <AuthenticatingIndicator />}
      {/* <Route path="/dashboard" exact render={() => <UserDashboard />} /> */}
      {/* <Route
        path="/dashboard/user/all-contest/"
        exact
        render={() => <UserDashboard />}
      /> */}
      <Route path="/dashboard" exact render={() => <TodayContest />} />

      {/* <Route
        path="/dashboard/user/contest/today"
        exact
        render={() => <TodayContest />}
      /> */}
      <Route
        path="/dashboard/contest/:contestId"
        exact
        render={({ match, location }) => (
          <ErrorBoundary>
            <ContestDetails
              contestId={match.params.contestId}
              path={location.pathname}
            />
          </ErrorBoundary>
        )}
      />
      <Route
        path="/dashboard/leaderboard/:contestId"
        exact
        render={({ match }) => (
          <ErrorBoundary>
            <ContestLeaderboardUser contestId={match.params.contestId} />
          </ErrorBoundary>
        )}
      />
      <Route
        path="/dashboard/view-submissions/:contestId"
        exact
        render={({ match, location }) => (
          <ViewSubmissions
            contestId={match.params.contestId}
            // userId={match.params.userId}
            path={location.pathname}
          />
        )}
      />
      <Route
        path="/dashboard/contest/:contestId/:challengeId"
        exact
        render={({ match, location }) => (
          <ErrorBoundary>
            <SingleChallenge
              contestId={match.params.contestId}
              challengeId={match.params.challengeId}
              path={location.pathname}
            />
          </ErrorBoundary>
        )}
      />
      <Route
        path="/dashboard/contest/:contestId/:challengeId/submit"
        exact
        render={({ match }) => (
          <ErrorBoundary>
            <SubmitCode
              contestId={match.params.contestId}
              challengeId={match.params.challengeId}
            />
          </ErrorBoundary>
        )}
      />
      {/* Leader board integeration */}
      <Route path="/dashboard/settings" render={() => <Settings />} />
      <Route path="/dashboard/profile" render={() => <Profile />} />
      <Route path="/dashboard/reports" render={() => <Reports />} />
      {/* Admin Dashboard - need authorization */}
      {/* also need navbar for user */}
      <ErrorBoundary>
        <AdminRoutes userType={userType} path={path} isLoading={isValidating}>
          <Route
            path="/dashboard/admin/"
            exact
            render={() => <AdminDashboard />}
          />
          <Route
            path="/dashboard/admin/all-contest"
            exact
            render={() => <AllContest />}
          />
          <Route
            path="/dashboard/admin/all-challenge"
            exact
            render={() => <AllChallenges />}
          />
          <Route
            path="/dashboard/admin/view/challenge/:challengeId"
            exact
            render={({ match }) => (
              <ViewChallenge challengeId={match.params.challengeId} />
            )}
          />
          <Route
            path="/dashboard/admin/:contestId/leaderboard/"
            exact
            render={({ match }) => (
              <ContestLeaderboard contestId={match.params.contestId} />
            )}
          />
          <Route
            path="/dashboard/admin/:contestId/edit/"
            exact
            render={({ match }) => (
              <EditContestDetails contestId={match.params.contestId} />
            )}
          />
          <Route
            path="/dashboard/admin/:contestId/user-submission/:userId"
            exact
            render={({ match, location }) => (
              <UserSubmissions
                contestId={match.params.contestId}
                userId={match.params.userId}
                path={location.pathname}
              />
            )}
          />
          <Route
            path="/dashboard/admin/:contestId/user-submission/:userId/events"
            exact
            render={({ match, location }) => (
              <UserSubmissionsEvents
                contestId={match.params.contestId}
                userId={match.params.userId}
                path={location.pathname}
              />
            )}
          />
          <Route
            path="/dashboard/admin/create-challenge"
            exact
            render={() => <CreateChallenge />}
          />
          <Route
            path="/dashboard/admin/create-contest"
            exact
            render={() => <CreateContest />}
          />
          <AdminRoutes userType={userType} isLoading={isValidating}>
            <Route
              path="/dashboard/admin/settings"
              exact
              render={() => <AdminSettings />}
            />
            <Route
              path="/dashboard/admin/users"
              exact
              render={() => <ViewUsers />}
            />
            <Route
              path="/dashboard/admin/users-create"
              exact
              render={() => <CreateUsers />}
            />
          </AdminRoutes>
        </AdminRoutes>
      </ErrorBoundary>
    </>
  ) : (
    error && <Redirect to="/login" />
  );
};

DashboardRoutes.propTypes = {
  isAuth: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuth: state.authReducer.isAuth,
  token: state.authReducer.token,
  userType: state.authReducer.userType,
  email: state.authReducer.email,
  error: state.authReducer.error,
  isLoadingAuth: state.authReducer.isLoading,
  isValidating: state.authReducer.isValidating,
  isLoadingAdmin: state.admin.isLoading,
  isLoadingUser: state.user.isLoading
});

const mapDispatchToProps = dispatch => ({
  logoutUser: payload => dispatch(logoutUser(payload)),
  setRedirectUrl: payload => dispatch(setRedirectUrl(payload)),
  resetRedirectUrl: () => dispatch(resetRedirectUrl()),
  validateUser: payload => dispatch(tokenValidateUser(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardRoutes);
