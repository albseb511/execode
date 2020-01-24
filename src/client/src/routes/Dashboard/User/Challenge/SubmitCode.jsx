import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import { connect } from "react-redux";
import axios from "../../../../utils/axiosInterceptor";

const initState = {
  testcases: [
    { passed: true, test_case_id: "1" },
    { passed: true, test_case_id: "2" },
    { passed: false, test_case_id: "3" },
    { passed: true, test_case_id: "4" },
    { passed: false, test_case_id: "5" },
    { passed: true, test_case_id: "6" },
    { passed: false, test_case_id: "7" },
    { passed: true, test_case_id: "8" },
    { passed: true, test_case_id: "9" },
    { passed: true, test_case_id: "10" }
  ],
  score: 0,
  isLoading: true,
  show: false,
  passed: false,
  code: `var a=1;\n var arr = [1,2,3,4,5,6]`,
  language: "Javascript"
};

const SubmitChallenge = ({
  contestId,
  challengeId,
  token,
  code,
  isLoading,
  language,
  error,
  errorMessage,
  isSubmit
}) => {
  const [state, setState] = useState(initState);
  const [testPass, setTestPass] = useState(null);
  const loading = (
    <div className="col-xl-5 ">
      <div className="spinner-border text-secondary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );

  useEffect(() => {
    //       {
    //         "challenge_id":"INTEGER",
    //         "contest_id":"INTEGER",
    //         "code":"STRING",
    //         "language":"STRING",
    //         "action":"submit the code",

    //          }

    axios
      .post(
        "/submit",
        {
          challenge_id: challengeId,
          contest_id: contestId,
          code,
          language,
          action: "submit code"
        },
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => {
        const result = res.data.test_case_result;
        const score = res.data.marks;
        setState({
          ...state,
          testcases: result,
          score,
          isLoading: false
        });
      })
      .catch(err => testingFake());
  }, []);

  const testingFake = () => {
    setState({ ...state, score: 7, isLoading: false });
  };

  useEffect(() => {
    if (!state.isLoading) {
      setTestPass(
        state.testcases.map((a, i) => {
          if (a.passed) {
            return (
              <div key={a.test_case_id} className="">
                <div>
                  <img
                    src="https://image.flaticon.com/icons/png/512/368/368633.png"
                    className="col-xl-2"
                    alt="flat icon"
                  />
                </div>
                {`Test Case ${i + 1}`}
              </div>
            );
          }
          return (
            <div key={a.test_case_id} className="">
              <div>
                <img
                  src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-round-1/254000/43-512.png"
                  className="col-xl-2"
                  alt="social messaging"
                />
              </div>
              {`Test Case ${i + 1}`}
            </div>
          );
        })
      );
    }
  }, [state.isLoading]);

  return (
    <div className="container mb-5">
      <h6 className="text-left">
        Submitted a few seconds ago • Score: {state.score}{" "}
      </h6>

      {/* this Section is for the testcase   */}
      {state.isLoading ? (
        <div className="row col-xl-12 justify-content-start mt-4">
          {loading}
        </div>
      ) : (
        <div className="row col-xl-12 justify-content-start mt-4">
          {testPass}
        </div>
      )}
      <div>
        <h2 className="text-left mt-4">Submitted Code</h2>
        <p className="text-secondary border text-left">
          Language : {state.language}
        </p>
        <div>
          <AceEditor
            mode="python"
            className="col-xl-12 "
            theme="github"
            defaultValue={state.code}
            readOnly="true"
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
          />
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
  errorMessage: state.user.errorMessage
});

export default connect(mapStateToProps)(SubmitChallenge);
