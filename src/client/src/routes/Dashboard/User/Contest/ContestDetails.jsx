/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable radix */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "../../../../utils/axiosInterceptor";
import {
  setContestEndTime,
  contestEnded,
  contestNotStarted,
  contestStart,
  contestReset
} from "../../../../redux/contest/action";
import TimeLeft from "../../../../components/common/TimeLeft";

// eslint-disable-next-line react/prop-types
const ContestDetails = ({
  contestId,
  path,
  setContestEndTime,
  // eslint-disable-next-line react/prop-types
  contestEnded,
  contestNotStarted,
  contestStart,
  contestReset,
  token
}) => {
  const [challenges, setChallenges] = useState([]);
  const [aboutchallenges, setAboutchallenges] = useState([]);
  useEffect(() => {
    async function getChallenges() {
      try {
        contestReset();
        const response = await axios.get(`/contest/${contestId}`, {
          headers: {
            Authorization: token
          }
        });
        setChallenges(response.data.data);
        setAboutchallenges(response.data.contest_data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
    getChallenges();
    return () => contestReset();
  }, []);

  useEffect(() => {
    const dStart = new Date(
      `${aboutchallenges.start_date} ${aboutchallenges.start_time}`
    );
    const dEnd = new Date(
      `${aboutchallenges.end_date} ${aboutchallenges.end_time}`
    );
    if (dStart <= Date.now() && Date.now() < dEnd) {
      const payload = {
        contestId,
        contestName: aboutchallenges.contest_name,
        endTimeLeft: parseInt((dEnd - Date.now()) / 1000)
        // change this to actual seconds for end of contest
      };
      setContestEndTime(payload);
      contestStart();
    } else if (dStart > Date.now()) {
      contestNotStarted();
    } else if (dEnd < Date.now()) {
      contestEnded();
    }
  }, [aboutchallenges]);
  return (
    <div>
      <div className="container">
        <div className="row py-3">
          <div className="col-md-8">
            <h3 className="font-weight-bold text-dark">
              {aboutchallenges.contest_name}
            </h3>
            <p>{aboutchallenges.details}</p>
          </div>
          <div className="col-md-4 text-center py-3">
            <ul className="list-inline align-text-bottom ">
              <div className="text-left d-flex">
                <b className="mt-2 mr-2">Start Date: </b>
                <div className="btn btn-dark active ml-auto">
                  {aboutchallenges.start_date}
                </div>
              </div>
              <li className="d-flex ">
                <b className="mt-2 mr-2">Start time: </b>
                <div className="btn btn-dark active ml-auto">
                  {aboutchallenges.start_time}
                </div>
              </li>
              <hr />
              <div className="text-left d-flex">
                <b className="mt-2 mr-2">End Date: </b>
                <div className="btn btn-dark active ml-auto">
                  {aboutchallenges.end_date}
                </div>
              </div>
              <li className="d-flex">
                <b className="mt-2 mr-2">End time: </b>
                <div className="btn btn-dark active ml-auto">
                  {aboutchallenges.end_time}
                </div>
              </li>
            </ul>
          </div>
          <div className="d-flex m-auto">
            <div>
              STATUS: <TimeLeft />
            </div>
            <Link
              className="ml-5"
              to={`${path.split("user/")[0]}leaderboard/${contestId}`}
            >
              <li className="btn btn-dark active">LEADERBOARD</li>
            </Link>
            <Link
              className="ml-5"
              to={`${path.split("user/")[0]}view-submissions/${contestId}`}
            >
              <li className="btn btn-dark active">VIEW SUBMISSIONS</li>
            </Link>
          </div>
        </div>

        {challenges &&
          challenges.map(challenge => (
            <div
              key={challenge.challenge_id}
              className="row border mb-1 mt-3
            "
            >
              <div className="col-md-8">
                <div>
                  <div className="card-body">
                    <Link
                      className="text-dark"
                      to={`/dashboard/contest/${contestId}/${challenge.challenge_id}`}
                    >
                      <h3 className="font-weight-bold">
                        {challenge.description}
                      </h3>
                    </Link>
                    <p>{challenge.problem_statement}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mt-4 mb-5">
                  <h6 className="h6">
                    Problem Level:
                    <span className="ml-1 text-primary font-weight-bold">
                      {challenge.difficulty}
                    </span>
                  </h6>

                  <Link
                    className={`btn ${
                      challenge.submit_status
                        ? "btn-success active"
                        : "btn-outline-dark"
                    } btn-block text-uppercase mt-3`}
                    to={`/dashboard/contest/${contestId}/${challenge.challenge_id}`}
                  >
                    {challenge.submit_status === null
                      ? "ATTEMPT"
                      : challenge.submit_status
                      ? "DONE"
                      : "TRY AGAIN"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  endTime: state.contest.endTimeLeft,
  token: state.authReducer.token
});

const mapDispatchToProps = dispatch => ({
  setContestEndTime: payload => dispatch(setContestEndTime(payload)),
  contestNotStarted: () => dispatch(contestNotStarted()),
  contestStart: payload => dispatch(contestStart(payload)),
  contestEnded: payload => dispatch(contestEnded(payload)),
  contestReset: () => dispatch(contestReset())
});

export default connect(mapStateToProps, mapDispatchToProps)(ContestDetails);
