/* eslint-disable no-console */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "../../../../utils/axiosInterceptor";
import {
  submitPageRouteRequest,
  eventCodeSubmit
} from "../../../../redux/user/action";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/theme-monokai";

const THEME = ["monokai", "github"];

// eslint-disable-next-line react/prop-types
const SingleChallenge = ({
  challengeId,
  contestId,
  token,
  path,
  submit,
  eventSubmit,
  email
}) => {
  const [singleChallenge, setSingleChallenge] = useState([]);
  const [theme, setthemeUpdate] = useState("monokai");
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [runCodeResponse, setRunCodeResponse] = useState({});
  const history = useHistory();
  const location = useLocation();
  const languagesList = ["javascript", "python", "cpp"];
  const [isLoading, setIsLoading] = useState(false)
  let data = "";
  // set placeholder data
  const setPlaceHolderData = () => {
    data = localStorage.getItem("bStore");
    if (data && data !== "") {
      data = JSON.parse(data);
    }
    const defLang = data
      ? data[`${email}_default`] || languagesList[0]
      : languagesList[0];

    if (
      !data ||
      !data[`${email}__${contestId}__${challengeId}__${defLang}__default`]
    ) {
      if (!data) data = {};
      languagesList.forEach(a => {
        if (a === "javascript") {
          data[`${email}__${contestId}__${challengeId}__${a}__default`] =
            'function runProgram(input){\n  // Write code here\n    console.log(input)\n}\n\n\n\n\nprocess.stdin.resume();\nprocess.stdin.setEncoding("ascii");\nlet read = "";\nprocess.stdin.on("data", function (input) {\n    read += input;\n});\nprocess.stdin.on("end", function () {\n\tread = read.replace(/\n$/,"")\n\tread = read.replace(/\\n$/,"")\n   runProgram(read);\n});';
          if (!data[`${email}__${contestId}__${challengeId}__${a}`]) {
            data[`${email}__${contestId}__${challengeId}__${a}`] =
              'function runProgram(input){\n  // Write code here\n    console.log(input)\n}\n\n\n\n\nprocess.stdin.resume();\nprocess.stdin.setEncoding("ascii");\nlet read = "";\nprocess.stdin.on("data", function (input) {\n    read += input;\n});\nprocess.stdin.on("end", function () {\n\tread = read.replace(/\n$/,"")\n\tread = read.replace(/\\n$/,"")\n   runProgram(read);\n});';
          }
        } else if (a === "python") {
          data[`${email}__${contestId}__${challengeId}__${a}__default`] =
            "# write code here. python3";
          if (!data[`${email}__${contestId}__${challengeId}__${a}`]) {
            data[`${email}__${contestId}__${challengeId}__${a}`] =
              "# write code here. python3";
          }
        }
      });
      if (!data[`${email}__default`]) {
        [data[`${email}__default`]] = languagesList;
      }
      localStorage.setItem("bStore", JSON.stringify(data));
    }
    setCode(data[`${email}__${contestId}__${challengeId}__${defLang}`]);
    setLanguage(data[`${email}__default`]);
  };
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
    setPlaceHolderData();
  }, []);

  useEffect(() => {
    data = localStorage.getItem("bStore");
    data = JSON.parse(data);
    data[`${email}__default`] = language;
    localStorage.setItem("bStore", JSON.stringify(data));
    setCode(data[`${email}__${contestId}__${challengeId}__${language}`]);
  }, [language]);

  const runCode = () => {
    setIsLoading(true)
    axios
      .post(
        "/runcode",
        {
          contest_id: contestId,
          challenge_id: challengeId,
          language,
          code,
          action: "run code"
        },
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(response => {
        setRunCodeResponse(response.data)
        setIsLoading(false)
      })
      .catch(err => console.log("error while running code", err.message));
  };

  const handleChangeCode = e => {
    setCode(e);
    data = localStorage.getItem("bStore");
    data = JSON.parse(data);
    data[`${email}__${contestId}__${challengeId}__${language}`] = e;
    localStorage.setItem("bStore", JSON.stringify(data));
  };

  const submitCode = () => {
    const payload = {
      code,
      language
    };
    submit(payload);
    history.push(`${location.pathname}/submit`);
  };

  const handleEvents = ({ text }, event) => {
    const date = new Date();
    const payload = {
      event,
      text: `${event} content \n\n//\n//\n\n// Code at ${date.toLocaleTimeString()} ${date.toLocaleDateString()}\n\n${code}`,
      contestId,
      challengeId,
      token
    };
    eventSubmit(payload);
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
          <p>{singleChallenge.constraints}</p>
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
                onChange={e => setLanguage(e.target.value)}
                onBlur={e => setLanguage(e.target.value)}
                value={language}
              >
                {languagesList.map(prolang => (
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
                {THEME.map(themedata => (
                  <option key={themedata} value={themedata}>
                    {themedata}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="d-block mb-4">
            <AceEditor
              style={{ width: "100%" }}
              placeholder="Ask for help if you need it"
              mode={language}
              onChange={e => handleChangeCode(e)}
              onCopy={event => handleEvents(event, "copy")}
              onPaste={event => handleEvents(event, "paste")}
              theme={theme}
              fontSize={16}
              showPrintMargin
              showGutter={true}
              highlightActiveLine
              value={code}
              debounceChangePeriod={200}
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
                onClick={submitCode}
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
              <hr />
              {runCodeResponse && 
                runCodeResponse.hasOwnProperty('is_error') &&
                runCodeResponse.is_error && 
                runCodeResponse.user_error.length!==0 &&
                <h6 className="text-danger">Error</h6>}
              <div className="py-3">
                <pre className="execode-code">
                  <code>
                    {isLoading && "loading..."}
                    {!isLoading &&
                      runCodeResponse &&
                      runCodeResponse.user_output &&
                      runCodeResponse.user_output.join("")}
                    {!isLoading && 
                      runCodeResponse && 
                      runCodeResponse.hasOwnProperty('is_error') &&
                      runCodeResponse.is_error &&
                        runCodeResponse.user_error}
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
  token: state.authReducer.token,
  email: state.authReducer.email
});

const mapDispatchToProps = dispatch => ({
  submit: payload => dispatch(submitPageRouteRequest(payload)),
  eventSubmit: payload => dispatch(eventCodeSubmit(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleChallenge);
