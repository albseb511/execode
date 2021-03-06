/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllAdminContests } from "../../../../redux/admin/action";

const AllContest = ({
  contests: contestFinalData,
  getContests,
  getContestId,
  token
}) => {
  useEffect(() => {
    const payload = {
      token
    };
    getContests(payload);
  }, []);
  const res = contestFinalData.map(contest => {
    return (
      <div className="col-md-6 mb-3 py-1" key={contest.id}>
        <div className="border p-3">
          <div className="ml-3">
            <Link
              className="text-dark"
              to={`/dashboard/admin/${contest.id}/leaderboard`}
            >
              <h3 className="font-weight-bold">{contest.contest_name}</h3>
            </Link>
            <p>{contest.details}</p>
            <div className="row">
              <div className="col-md-6">
                <b>Start Date: </b>
                <span>{contest.start_date}</span>
                <br /> <br />
                <b>Start time: </b>
                <span>{contest.start_time}</span>
              </div>
              <div className="col-md-6">
                <b>End Date: </b>
                <span>{contest.end_date}</span>
                <br /> <br />
                <b>End time: </b>
                <span>{contest.end_time}</span>
              </div>
            </div>
            <div className="d-flex mt-4">
              <div>
                <b>URL:</b>
                <p className="mx-auto">
                  https://masai-execode.now.sh{contest.url}/register
                </p>
              </div>
            </div>
            <div className="row  py-3 m-auto">
              <div className="col-sm-12 col-md-12 col-xl-6 mb-2">
                <Link
                  className="btn-block btn btn-outline-dark active"
                  to={`/dashboard/admin/${contest.id}/edit/`}
                >
                  More Details
                </Link>
              </div>

              <div className="col-sm-12 col-md-12 col-xl-6">
                <Link
                  className="btn-block btn btn-outline-dark active"
                  to={`/dashboard/admin/${contest.id}/leaderboard`}
                >
                  View Submissions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row">{res}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.admin.isLoading,
  contests: state.admin.contests,
  token: state.authReducer.token
});

const mapDispatchToProps = dispatch => ({
  getContests: payload => dispatch(fetchAllAdminContests(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllContest);
