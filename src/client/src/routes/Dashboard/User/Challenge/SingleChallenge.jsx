/* eslint-disable no-console */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import { connect } from "react-redux";
import axios from "../../../../utils/axiosInterceptor";
const THEME = ["monokai", "github"];

const LANGUAGE = ["javascript", "python"];

// eslint-disable-next-line react/prop-types
const SingleChallenge = ({ challengeId, contestId, token }) => {
  const [singleChallenge, setSingleChallenge] = useState([]);
  const [theme, setthemeUpdate] = useState("monokai");
  const [progLanguages, setprogLanguages] = useState("javascript");
  const [code, setCode] = useState("");
  const [runCodeResponse, setRunCodeResponse] = useState({});
  useEffect(() => {
    async function getChallenges() {
      try {
        const response = await axios.get(`/challenge/${challengeId}`, {
          headers: {
            Authorization: token
          }
        });
        setSingleChallenge(response.data.challenge);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
    getChallenges();
  }, []);

  const runCode = async () => {
    // from match object
    console.log(contestId, challengeId);
    const res = await axios
      .post(
        "/runcode",
        {
          contest_id: contestId,
          challenge_id: challengeId,
          language: "python",
          code,
          action: "run code"
        },
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(response => setRunCodeResponse(response.data))
      .catch(err => console.log("error while running code"));
    console.log(res);
    // next(action)
  };

  return (
    <div>
      <div className="container border py-3">
        <div className="row">
          <div className="col-md-10">
            <h3 className="font-weight-bold">
              {singleChallenge.challenge_name}
            </h3>
          </div>
          <div className="col-md-2 ">
            <span className="badge badge-success">
              {singleChallenge.difficulty}
            </span>
          </div>
        </div>

        <div className="mt-3 mb-3">
          <div className="mt-3 mb-3">
            <b>Problem</b>
          </div>
          <p>{singleChallenge.problem_statement}</p>
        </div>
        <div className="mt-3 mb-3">
          <div className="mt-3 mb-3">
            <b>Input Format</b>
          </div>
          <p>{singleChallenge.input_format}</p>
        </div>
        <div className="mt-3 mb-3">
          <div className="mt-3 mb-3">
            <b>Output Format</b>
          </div>
          <p>{singleChallenge.output_format}</p>
        </div>
        <div className="mt-3 mb-3">
          <div className="mt-3 mb-3">
            <b>Constraints</b>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="mt-3 mb-3">
          <div className="mt-3 mb-3">
            <b>Sample Input</b>
          </div>
          <div className="py-3">
            <pre className="execode-code">
              <code>{singleChallenge.sample_input} </code>
            </pre>
          </div>
        </div>
        <div className="mt-3 mb-3">
          <div className="mt-3 mb-3">
            <b>Sample Output</b>
          </div>
          <div className="mt-1 mb-4">
            <pre className="execode-code">
              <samp>{singleChallenge.sample_output}</samp>
            </pre>
          </div>
        </div>
        <div>
          <div className="row mt-5 mb-3">
            <div className="col-md-6">
              <label>language</label>
              <select
                className="browser-default custom-select"
                onChange={e => setprogLanguages(e.target.value)}
                onBlur={e => setprogLanguages(e.target.value)}
              >
                {LANGUAGE.map(prolang => (
                  <option key={prolang} value={prolang}>
                    {prolang}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label>Theme</label>
              <select
                className="browser-default custom-select"
                onChange={e => setthemeUpdate(e.target.value)}
                onBlur={e => setthemeUpdate(e.target.value)}
              >
                {THEME.map(thmedata => (
                  <option key={thmedata} value={thmedata}>
                    {thmedata}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="d-block mb-4">
            <AceEditor
              style={{ width: "100%" }}
              placeholder="console.log('Hello Masai School');"
              mode={progLanguages}
              onChange={e => setCode(e)}
              theme={theme}
              fontSize={16}
              showPrintMargin
              showGutter={true}
              highlightActiveLine
              value={code}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2
              }}
            />
          </div>
          <div className="row">
            <div className="col-md-10 text-right">
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={runCode}
              >
                Run Code
              </button>
            </div>
            <div className="col-md-2 text-center">
              <button
                type="button"
                className="btn btn-outline-dark btn-block active"
              >
                Submit Code
              </button>
            </div>
          </div>
        </div>
        <div className="jumbotron jumbotron-fluid mt-5 bg-white border ">
          <div className="container">
            <div className="mb-3">
              <h6 className="text-success">Sample Output</h6>
              <div className="py-3">
                <pre className="execode-code">
                  <code>{singleChallenge.sample_output}</code>
                </pre>
              </div>
            </div>
            <div>
              <h6 className="text-primary">Output</h6>
              <div className="py-3">
                <pre className="execode-code">
                  <code>
                    {runCodeResponse &&
                      runCodeResponse.user_output &&
                      runCodeResponse.user_output.join("\n")}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.authReducer.token
});

export default connect(mapStateToProps)(SingleChallenge);
