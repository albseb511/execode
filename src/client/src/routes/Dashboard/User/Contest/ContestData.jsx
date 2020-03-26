/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const ContestData = ({ contests, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="row">
      {contests.map(post => (
        <div className="col-md-6 mb-3 py-1" key={post.id}>
          <div className="border p-3">
            <div className="ml-3">
              <Link className="text-dark" to={`/dashboard/contest/${post.id}`}>
                <h3 className="font-weight-bold">{post.contest_name}</h3>
              </Link>
              <p>{post.details}</p>
              <div className="row">
                <div className="col-md-6">
                  <b>Start Date: </b>
                  <span>{post.start_date}</span>
                  <br /> <br />
                  <b>Start time: </b>
                  <span>{post.start_time}</span>
                </div>
                <div className="col-md-6">
                  <b>End Date: </b>
                  <span>{post.end_date}</span>
                  <br /> <br />
                  <b>End time: </b>
                  <span>{post.end_time}</span>
                </div>
              </div>
              <div className="row py-3 mt-3">
                <div className="col-md-11 ml-1">
                  <Link
                    className="btn-block btn btn-outline-dark"
                    to={`/dashboard/contest/${post.id}`}
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
  );
};

export default ContestData;
