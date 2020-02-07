/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  submitPageRouteExit,
  getSubmitResults,
  submitTestCase,
  submitTestCaseEnd
} from "../../../../redux/user/action";
import "./spinner.css"
import { Link } from "react-router-dom"

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
  isTestCasesDataReady,
  submitTestCase,
  codeFilePath,
  submitPath,
  testCasePending,
  timeLimit,
  getTestCaseEnded,
  submissionId,
  submitTestCaseEnd,
}) => {
  const history = useHistory();
  const location = useLocation();
  const [score, setScore] = useState(0);
  const path = location.pathname.split("/submit")[0];
  if(!isSubmit){
    history.push(`${path}`)
  }

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

  useEffect(()=>{
    for(let i=0; i<testCaseResults.length; i++){
      let {id, strength, input_file, output_file} = testCaseResults[i]
      let payload = {
        language,
        test_id: id,
        strength,
        input_file,
        output_file,
        path: submitPath,
        code_file_path: codeFilePath,
        token,
        timeLimit
      }
      submitTestCase(payload)
    }
  },[isTestCasesDataReady])

  useEffect(()=>{
    let newScore = testCaseResults.reduce((acc,test)=>test.result?acc+test.strength:acc,0)
    setScore(newScore)
  },[testCasePending])

  useEffect(()=>{
    if(testCasePending===0){
      let test_case_info = {}
      testCaseResults.forEach((test,i)=>{
        test_case_info[`tco${i+1}`] = test.result
      })
      let payload = {
          submission_id: submissionId,
          path: submitPath,
          test_case_info,
          contest_id: contestId,
          challenge_id: challengeId,
          token
      }
      submitTestCaseEnd(payload)
    }
  },[getTestCaseEnded])

  if (!isLoading && isSubmit && testCaseResults) {
    testPass = testCaseResults.map((a, i) => {
      if (a.result==="pending"){
        return(
          <div key={a.id} className="col-md-2 mt-4 mb-3 text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div>
              {`Test Case ${i + 1}`}
            </div>
          </div>
        )
      }
      if (a.result) {
        return (
          <div key={a.test_case_id} className="col-md-2 mt-4 mb-3 text-center">
            <div>
              <div>
                <i className="fas fa-check-circle fa-lg text-success fa-2x mb-2" />
              </div>
              {`Test Case ${i + 1}`}
            </div>
          </div>
        );
      }
      return (
        <div  key={a.test_case_id} className="col-md-2 mt-4 mb-3 text-center">
          <div >
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
      <div className="d-flex p-2">
            <h4 className="font-weight-bold">Result</h4>
            <Link to={path} className="ml-auto">
              <div className="btn btn-dark active">GO BACK</div>
            </Link>
          </div>
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
        <>
          <b className="row ml-5">{error && errorMessage}</b>
          <div className="row">{!error && testPass}</div>
        </>
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
              readOnly
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
  submitPath: state.user.submitPath,
  codeFilePath: state.user.codeFilePath,
  testCasePending: state.user.testCasePending,
  isTestCasesDataReady: state.user.isTestCasesDataReady,
  timeLimit: state.user.timeLimit,
  getTestCaseEnded: state.user.getTestCaseEnded,
  submissionId: state.user.submissionId
});

const mapDispatchToProps = dispatch => ({
  unmount: () => dispatch(submitPageRouteExit()),
  getResults: payload => dispatch(getSubmitResults(payload)),
  submitTestCase: payload => dispatch(submitTestCase(payload)),
  submitTestCaseEnd: payload => dispatch(submitTestCaseEnd(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitChallenge);
