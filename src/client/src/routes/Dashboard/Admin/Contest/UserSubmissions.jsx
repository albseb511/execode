/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react/sort-comp */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import { Link } from "react-router-dom";
import {
  fetchUserSubmissions,
  fetchUserCode
} from "../../../../redux/admin/action";
import Axios from "../../../../utils/axiosInterceptor";

class UserSubmissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissions: [],
      code: "",
      testCaseInfo: {}
    };
  }

  getUserSubmissions = () => {
    // send auth token
    const { userId, contestId } = this.props;
    Axios.get(`/contest/${contestId}/leaderboard/${userId}`).then(res => {
      if (res && res.data && res.data.challenges) {
        this.setState({
          submissions: res.data.challenges
        });
      }
    });
  };

  getSubmittedCode = submission_id => {
    const { userId, contestId } = this.props;
    Axios.get(
      `/contest/${contestId}/leaderboard/${userId}/code/${submission_id}`
    ).then(res => {
      if (res && res.data && res.data.code) {
        this.setState({
          code: res.data.code,
          testCaseInfo: res.data.test_case_info
        });
      }
    });
  };

  componentDidMount() {
    // const { fetchUserSubmissions: fetchSubmissions } = this.props;
    // fetchSubmissions();
    this.getUserSubmissions();
  }

  viewUserCode = id => {
    // const { fetchUserCode: fetchCode } = this.props;
    // fetchCode(id);
    this.getSubmittedCode(id);
  };
  render() {
    console.log(this.state.testCaseInfo)
    // submissions from props : changed to submissions from state, code as well
    const { language, path } = this.props;
    const { submissions, code } = this.state;
    return (
      <div>
        <div className="container">
          <div className="d-flex p-2">
            <h4 className="font-weight-bold">Submitted Code</h4>
            <Link to={`${path}/events`} className="ml-auto">
              <div className="btn btn-dark active">EVENTS</div>
            </Link>
          </div>
          <div>
            <div className="row text-center">
              {this.state.testCaseInfo &&
                Object.values(this.state.testCaseInfo).map((res, index) => {
                  console.log("test case,",index+1) 
                  return(
                  <div key={index}>
                    <span className="text-center">Test {index + 1} </span>
                    <div>
                      {res ? (
                        <div className="col-md-2 text-center">
                          <span>
                            <i className="fas fa-check-circle fa-lg text-success fa-2x mt-3 mb-2" />
                          </span>
                        </div>
                      ) : (
                        <div className="col-md-2 text-center">
                          <span>
                            <i className="fas fa-times-circle fa-lg text-danger fa-2x mt-3 mb-2" />
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )})}
            </div>
          </div>
          <div className="d-block mb-5 mt-4 disabled">
            <AceEditor
              placeholder="View User Code"
              mode={language}
              className="disabled"
              style={{ width: "100%" }}
              theme="monokai"
              name="user-submission"
              onLoad={this.onLoad}
              onChange={this.onChange}
              fontSize={14}
              showPrintMargin
              showGutter
              highlightActiveLine
              readOnly
              value={code}
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2
              }}
            />
          </div>
          <div className="mt-4 mb-3">
            <h4 className="font-weight-bold">Submission list</h4>
            <div className="row">
              <table className="table text-center">
                <thead className="thead-dark">
                  <tr className="text-white">
                    <th scope="col">Challenge Name</th>
                    <th scope="col">Score</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Submitted at</th>
                    <th scope="col">Code</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions &&
                    submissions.map(ele => {
                      return (
                        <tr key={ele.submission_id}>
                          <td>{ele.challenge_name}</td>
                          <td>{ele.score}</td>
                          <td>{ele.name}</td>
                          <td>{ele.created_at}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-dark active"
                              onClick={() =>
                                this.viewUserCode(ele.submission_id)
                              }
                            >
                              View Code
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserSubmissions.propTypes = {
  submissions: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchUserSubmissions: PropTypes.func.isRequired,
  fetchUserCode: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  submissions: state.admin.userSubmissions.submissions,
  code: state.admin.userSubmissions.viewCode,
  language: state.admin.userSubmissions.viewLanguage
});

export default connect(mapStateToProps, {
  fetchUserSubmissions,
  fetchUserCode
})(UserSubmissions);
