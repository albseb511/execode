/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable lines-between-class-members */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../../../utils/axiosInterceptor";

const TodayContest = () => {
  const [contests, setContests] = useState([]);

  console.log(contests);
  useEffect(() => {
    async function getContests() {
      try {
        const response = await axios.get(`/contests`);
        setContests(response.data.contests);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
    getContests();
  }, []);
  return (
    <div>
      <div className="container">
        <div className="mb-3 mt-3">
          <h3>All Contest</h3>
        </div>
        <div className="row">
          {contests.map(costlist => (
            <div className="col-md-6 mb-3 py-1" key={costlist.id}>
              <div className="border py-3">
                <div className="ml-3">
                  <Link
                    className="text-dark"
                    to={`/dashboard/user/${costlist.id}`}
                  >
                    <h3 className="font-weight-bold">
                      {costlist.contest_name}
                    </h3>
                  </Link>
                  <p>{costlist.details}</p>
                  <div className="row">
                    <div className="col-md-6">
                      <b>Start Date: </b>
                      <span>{costlist.start_date}</span>
                      <br /> <br />
                      <b>Start time: </b>
                      <span>{costlist.start_time}</span>
                    </div>
                    <div className="col-md-6">
                      <b>End Date: </b>
                      <span>{costlist.end_date}</span>
                      <br /> <br />
                      <b>End time: </b>
                      <span>{costlist.end_time}</span>
                    </div>
                  </div>
                  <div className="row  py-3">
                    <div className="col-md-11 ml-1">
                      <Link
                        className="btn-block btn btn-outline-dark"
                        to={`/dashboard/user/${costlist.id}`}
                      >
                        Enter
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodayContest;
