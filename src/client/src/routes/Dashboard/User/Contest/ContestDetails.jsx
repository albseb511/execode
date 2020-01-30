// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../../../utils/axiosInterceptor";

// eslint-disable-next-line react/prop-types
const ContestDetails = ({ contestId, path }) => {
  const [challenges, setChallenges] = useState([]);
  const [aboutchallenges, setAboutchallenges] = useState([]);

  useEffect(() => {
    async function getChallenges() {
      try {
        const response = await axios.get(`/contest/${contestId}`);
        setChallenges(response.data.data);
        setAboutchallenges(response.data.contest_data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
    getChallenges();
  }, []);
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
              <hr />
              <Link to={`${path.split("user/"+contestId)[0]}leaderboard/${contestId}`}>
                <li className="btn btn-dark active">
                  LEADERBOARD      
                </li>
              </Link>
            </ul>
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
                      to={`/dashboard/user/${contestId}/${challenge.challenge_id}`}
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
                    className="btn btn-outline-dark btn-block text-uppercase mt-3"
                    to={`/dashboard/user/${contestId}/${challenge.challenge_id}`}
                  >
                    Attempt
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ContestDetails;
