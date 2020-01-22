/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
// import AceEditor from "react-ace";
import { connect } from "react-redux";
import axios from "../../../../utils/axiosInterceptor";

// eslint-disable-next-line react/prop-types
const SingleChallenge = ({ challengeId, token }) => {
  const [singleChallenge, setsingleChallenge] = useState([]);

  useEffect(() => {
    async function getChallenges() {
      try {
        const response = await axios.get(`/challenge/${challengeId}`, {
          headers: {
            Authorization: token
          }
        });
        setsingleChallenge(response.data.challenge);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
    getChallenges();
  }, []);
  return (
    <div>
      <div className="container border py-5">
        <h1>challenge_name: {singleChallenge.challenge_name}</h1>
        <p>problem_statement: {singleChallenge.problem_statement}</p>
        <h5>difficulty: {singleChallenge.difficulty}</h5>
        <h5>input format: {singleChallenge.input_format}</h5>
        <h5>output format: {singleChallenge.output_format}</h5>
        <h6>challenge id: {singleChallenge.challenge_id}</h6>
        <p>sample input</p>
        <pre>{singleChallenge.sample_input}</pre>
        <p>sample output</p>
        <pre>{singleChallenge.sample_output}</pre>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.authReducer.token
});

export default connect(mapStateToProps)(SingleChallenge);
