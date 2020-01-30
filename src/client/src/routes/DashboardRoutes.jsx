import React, {useEffect} from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import UserDashboard from "./Dashboard/User/UserDashboard";
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
import ContestLeaderboardUser from "./Dashboard/User/Contest/ContestLeaderboardUser"
import { logoutUser, setRedirectUrl, resetRedirectUrl } from "../redux/authentication/actions";

const DashboardRoutes = ({ isAuth, token, userType, email, logoutUser, path, setRedirectUrl, resetRedirectUrl }) => {
  useEffect(()=>{
    !isAuth?setRedirectUrl(path):resetRedirectUrl()
  },[])
  return isAuth ? (
    <>
      <Route
        path="/dashboard"
        render={({ location }) => (
          <NavBar
            location={location}
            email={email}
            token={token}
            userType={userType}
            logoutUser={logoutUser}
          />
        )}
      />
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
        path="/dashboard/user/:contestId"
        exact
        render={({ match, location }) => (
          <ContestDetails contestId={match.params.contestId} path={location.pathname} />
        )}
      />
      <Route
        path="/dashboard/leaderboard/:contestId"
        exact
        render={({ match }) => (
          <ContestLeaderboardUser contestId={match.params.contestId} />
        )}
      />
      <Route
        path="/dashboard/user/:contestId/:challengeId"
        exact
        render={({ match, location }) => (
          <SingleChallenge
            contestId={match.params.contestId}
            challengeId={match.params.challengeId}
            path={location.pathname}
          />
        )}
      />
      <Route
        path="/dashboard/user/:contestId/:challengeId/submit"
        exact
        render={({ match }) => (
          <SubmitCode
            contestId={match.params.contestId}
            challengeId={match.params.challengeId}
          />
        )}
      />
      {/* Leader board integeration */}
      <Route path="/dashboard/settings" render={() => <Settings />} />
      <Route path="/dashboard/profile" render={() => <Profile />} />
      <Route path="/dashboard/reports" render={() => <Reports />} />

      {/* Admin Dashboard - need authorization */}
      {/* also need navbar for user */}
      <Route path="/dashboard/admin/" exact render={() => <AdminDashboard />} />
      <Route
        path="/dashboard/admin/all-contest"
        exact
        render={() => <AllContest />}
      />
      <Route
        path="/dashboard/admin/:contestId/leaderboard/"
        exact
        render={({ match }) => (
          <ContestLeaderboard contestId={match.params.contestId} />
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
    </>
  ) : (
    <Redirect to="/login" />
  );
};

DashboardRoutes.propTypes = {
  isAuth: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuth: state.authReducer.isAuth,
  token: state.authReducer.token,
  userType: state.authReducer.userType,
  email: state.authReducer.email
});

const mapDispatchToProps = dispatch => ({
  logoutUser: payload => dispatch(logoutUser(payload)),
  setRedirectUrl: payload => dispatch(setRedirectUrl(payload)),
  resetRedirectUrl: () => dispatch(resetRedirectUrl())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardRoutes);
