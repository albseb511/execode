import React, { Component } from "react";
import PropTypes from "prop-types";

class ChallengeSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "",
      timeLimit: "",
      memoryLimit: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { language, timeLimit, memoryLimit } = this.state;
    const { addSettings, settings, delSettings } = this.props;
    return (
      <div>
        <h3>Challenge Settings</h3>
        <br />

        <div className="form-group row">
          <div className="col-sm-6 col-md-3">
            <select
              value={language}
              name="language"
              onChange={this.handleChange}
              id="language"
              className="form-control"
              required
            >
              <option>Choose Language...</option>
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="javascript">Javascript</option>
            </select>
          </div>
          <div className="col-sm-6 col-md-3">
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              id="time limit"
              value={timeLimit}
              placeholder="Time limit [ms]"
              name="timeLimit"
              required
            />
          </div>
          <div className="col-sm-6 col-md-3">
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              id="memory limit"
              value={memoryLimit}
              placeholder="Memory Limit [kb]"
              name="memoryLimit"
            />
          </div>
          <div className="col-sm-6 col-md-3">
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => addSettings(this.state)}
            >
              Add Setting
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <ul>
              {settings
                ? settings.map(setting => (
                    <li>
                      Language:{setting.language} | Time Limit:
                      {setting.timeLimit} | Memory Limit:{setting.memoryLimit}
                      <button type="button" className="close" onClick={()=>delSettings(setting.language)} aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ChallengeSettings.propTypes = {
  settings: PropTypes.arrayOf(PropTypes.object).isRequired,
  addSettings: PropTypes.func.isRequired
};

export default ChallengeSettings;
