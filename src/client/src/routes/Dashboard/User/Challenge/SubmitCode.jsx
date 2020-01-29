/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  submitPageRouteExit,
  getSubmitResults
} from "../../../../redux/user/action";

const SubmitChallenge = ({
  contestId,
  challengeId,
  token,
  code,
  isLoading,
  language,
  error,
  errorMessage,
  isSubmit,
  unmount,
  getResults,
  testCaseResults,
  score
}) => {
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname.split("submit").join("");
  // if(!isSubmit){
  //   history.push(`${path}`)
  // }

  let testPass = null;

  const getResultsRequest = async () => {
    const payload = {
      challenge_id: challengeId,
      contest_id: contestId,
      code,
      language,
      action: "submit code",
      token
    };
    await getResults(payload);
  };

  useEffect(() => {
    getResultsRequest();
    return () => {
      unmount();
    };
  }, []);

  if (!isLoading && isSubmit && testCaseResults) {
    console.log("test cases mapping");
    testPass = testCaseResults.map((a, i) => {
      if (a.passed) {
        return (
          <div key={a.test_case_id} className="col-md-2 mt-4 mb-3 text-center">
            <div key={a.test_case_id}>
              <div>
                <i className="fas fa-check-circle fa-lg text-success fa-2x mb-2" />
              </div>
              {`Test Case ${i + 1}`}
            </div>
          </div>
        );
      }
      return (
        <div className="col-md-2 mt-4 mb-3 text-center">
          <div key={a.test_case_id}>
            <div>
              <i className="fas fa-times-circle fa-lg text-danger fa-2x mb-2" />
            </div>
            {`Test Case ${i + 1}`}
          </div>
        </div>
      );
    });
  }

  return (
    <div className="container mb-5">
      <h6 className="text-left mt-4 mb-3">
        Submitted a few seconds ago •
        <b className="text-primary font-weight-bold"> Score: </b>
        <span className="text-primary font-weight-bold">
          {!isLoading && testPass && score}
        </span>
      </h6>
      {/* this Section is for the testcase   */}
      {isLoading ? (
        <div className="row ">
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">{testPass}</div>
      )}
      <div>
        <hr />
        <h3 className="text-left mt-3 font-weight-bold mb-3">Submitted Code</h3>
        <mark className="text-dark border">Language : {language}</mark>
        <div>
          <div className="d-block mb-4">
            <AceEditor
              style={{ width: "100%" }}
              mode="python"
              theme="github"
              value={code}
              readOnly="true"
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.authReducer.token,
  code: state.user.submitCode,
  language: state.user.language,
  isLoading: state.user.isLoading,
  error: state.user.error,
  errorMessage: state.user.errorMessage,
  testCaseResults: state.user.testCaseResults,
  isSubmit: state.user.isSubmit,
  score: state.user.score
});

const mapDispatchToProps = dispatch => ({
  unmount: () => dispatch(submitPageRouteExit()),
  getResults: payload => dispatch(getSubmitResults(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitChallenge);
