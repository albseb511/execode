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

class UserSubmissionsEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissions: [],
      code: "",
      testCaseInfo: {}
    };
  }

  getUserEvents = () => {
    // send auth token
    const { userId, contestId } = this.props;
    Axios.get(`event/${userId}`, {
      headers: {
        Authorization: this.props.token
      }
    }).then(res => {
      if (res && res.data && res.data.events) {
        this.setState({
          submissions: res.data.events
        });
      }
    });
  };

  getSubmittedCode = submission_id => {
    const { userId, contestId } = this.props;
    Axios.get(
      `contest/${contestId}/leaderboard/${userId}/code/${submission_id}`
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
    this.getUserEvents();
  }

  viewUserCode = id => {
    // const { fetchUserCode: fetchCode } = this.props;
    // fetchCode(id);
    this.getSubmittedCode(id);
  };

  render() {
    // submissions from props : changed to submissions from state, code as well
    const { language, path } = this.props;
    const { submissions, code } = this.state;
    return (
      <div>
        <div className="container">
          <div className="d-flex p-2">
            <h4 className="font-weight-bold">Events</h4>
            <Link to={`${path.split("/events")[0]}`} className="ml-auto">
              <div className="btn btn-dark active">GO BACK</div>
            </Link>
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
            <h4 className="font-weight-bold">Events list</h4>
            <div className="row">
              <table className="table text-center">
                <thead className="thead-dark">
                  <tr className="text-white">
                    <th scope="col">Challenge Name</th>
                    <th scope="col">Event Type</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Submitted at</th>
                    <th scope="col">Content</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions &&
                    submissions.map((ele, index) => {
                      return (
                        <tr key={index}>
                          <td>{ele.challenge_name}</td>
                          <td>{ele.event}</td>
                          <td>{ele.name}</td>
                          <td>{ele.created_at}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-dark active"
                              onClick={() => this.setState({ code: ele.text })}
                            >
                              View Content
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

UserSubmissionsEvents.propTypes = {
  submissions: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchUserSubmissions: PropTypes.func.isRequired,
  fetchUserCode: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  submissions: state.admin.userSubmissions.submissions,
  code: state.admin.userSubmissions.viewCode,
  language: state.admin.userSubmissions.viewLanguage,
  token: state.authReducer.token
});

export default connect(mapStateToProps, {
  fetchUserSubmissions,
  fetchUserCode
})(UserSubmissionsEvents);
