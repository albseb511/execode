/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllChallenges } from "../../../../redux/admin/action";

const AllContest = ({
  challenges,
  getChallenges,
  token
}) => {
  useEffect(() => {
    const payload = {
      token
    };
    getChallenges(payload);
  }, []);
  const res = challenges.map(challenge => {
    return (
      <div className="col-md-6 mb-3 py-1" key={challenge.id}>
        <div className="border py-3">
          <div className="ml-3">
            <Link
              className="text-dark"
              to={`/dashboard/admin/view/challenge/${challenge.id}`}
            >
              <h3 className="font-weight-bold">{challenge.challenge_name} - {challenge.id}</h3>
            </Link>
            <p>{challenge.details}</p>
            {/* <div className="row">
              <div className="col-md-6">
                <b>Start Date: </b>
                <span>{challenge.start_date}</span>
                <br /> <br />
                <b>Start time: </b>
                <span>{challenge.start_time}</span>
              </div>
              <div className="col-md-6">
                <b>End Date: </b>
                <span>{challenge.end_date}</span>
                <br /> <br />
                <b>End time: </b>
                <span>{challenge.end_time}</span>
              </div>
            </div>
            <div className="d-flex mt-4">
              <b>URL:</b>
              <p className="mx-auto">localhost:3000/dashboard/user/{challenge.id}</p>  
            </div> */}
            <div className="row  py-3">
              <div className="col-md-11 ml-1">
                <Link
                  className="btn-block btn btn-outline-dark active"
                  to={`/dashboard/admin/view/challenge/${challenge.id}`}
                >
                  MORE DETAILS
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
  challenges: state.admin.allChallenges,
  token: state.authReducer.token
});

const mapDispatchToProps = dispatch => ({
  getChallenges: payload => dispatch(fetchAllChallenges(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllContest);
