// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../../../utils/axiosInterceptor";

// eslint-disable-next-line react/prop-types
const ContestDetails = ({ contestId }) => {
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
          <div className="col-md-3 text-center py-3">
            <ul className="list-inline align-text-bottom ">
              <span className="text-left">
                <b>Start Date: </b>
                {aboutchallenges.start_date}
              </span>
              <hr />
              <li className="list-inline-item ">
                <b className="text-dark">Start time: </b>
                {aboutchallenges.start_time}
              </li>

              <li className="list-inline-item">
                <span className="font-weight-bold text-light">|</span>
                <b className="text-dark"> End time:</b>
                {aboutchallenges.end_time}
              </li>
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
                      to={`/dashboard/user/${aboutchallenges.contest_name}/${challenge.challenge_id}`}
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
                    to={`/dashboard/user/${aboutchallenges.contest_name}/${challenge.challenge_id}`}
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
