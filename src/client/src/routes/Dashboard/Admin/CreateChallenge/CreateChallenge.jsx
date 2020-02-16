/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */
import React, { Component } from "react";
import { connect } from "react-redux";
import ChallengeDetails from "../../../../components/ChallengeDetails/ChallengeDetails";
import ChallengeSettings from "../../../../components/ChallengeSettings/ChallengeSettings";
import AddTestCases from "../../../../components/AddTestCases/AddTestCases";
import axios from "../../../../utils/axiosInterceptor";

const initialState = {
  detailsTab: true,
  settingsTab: false,
  testCasesTab: false,
  challenge_name: "",
  difficulty: "",
  description: "",
  problem_statement: "",
  input_format: "",
  constraints: "",
  output_format: "",
  sample_input: "",
  sample_output: "",
  settings: [],
  test_cases: [],
  test_input: [],
  test_output: [],
  resMessage: ""
};

class CreateChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleDetailsChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addTestCase = testCase => {
    if (
      testCase.testCaseName &&
      testCase.visibility &&
      testCase.inputFile &&
      testCase.strength &&
      testCase.outputFile
    ) {
      if(this.state.test_cases.find(ele=>ele.testCaseName===testCase.testCaseName)){
        alert("test case name already exists")
        return false
      }
      this.setState(state => {
        return {
          test_cases: [...state.test_cases, testCase],
          test_input: [...state.test_input, testCase.inputFile],
          test_output: [...state.test_output, testCase.outputFile]
        };
      });
    } else {
      alert("All fields are mandatory");
    }
  };

  delTestCase = testCaseName => {
    let {test_cases,test_input,test_output} = this.state
    let index = test_cases.findIndex(test=>test.testCaseName===testCaseName)
    test_cases = test_cases.filter((a,i)=>i!=index)
    test_input = test_input.filter((a,i)=>i!=index)
    test_output = test_output.filter((a,i)=>i!=index)
    this.setState({test_cases,test_input,test_output}) 
  }

  addSettings = setting => {
    this.setState(state => {
      return { settings: [...state.settings, setting] };
    });
  };

  delSettings = language => {
    let {settings:newSetting} = this.state
    newSetting = newSetting.filter(item=>item.language!=language)
    this.setState({settings:newSetting})
  }

  handleTabChange = tab => {
    if (tab === "details") {
      this.setState({
        detailsTab: true,
        settingsTab: false,
        testCasesTab: false
      });
    } else if (tab === "settings") {
      this.setState({
        detailsTab: false,
        settingsTab: true,
        testCasesTab: false
      });
    } else if (tab === "test") {
      this.setState({
        detailsTab: false,
        settingsTab: false,
        testCasesTab: true
      });
    }
  };

  createChallenge = () => {
    //   send data
    const form = new FormData();
    // use new form data
    const data = {
      difficulty: this.state.difficulty,
      description: this.state.description,
      problem_statement: this.state.problem_statement,
      input_format: this.state.input_format,
      constraints: this.state.constraints,
      output_format: this.state.output_format,
      sample_input: this.state.sample_input,
      sample_output: this.state.sample_output
    };
    const test_cases = this.state.test_cases.map(tcs => {
      return {
        test_case_name: tcs.testCaseName,
        visibility: tcs.visibility,
        strength: tcs.strength
      };
    });
    // validation
    if (data && test_cases && this.state.settings) {
      for (const key in data) {
        if (!data[key]) {
          alert(`${key} is required`);
          return false;
        }
      }
      if (!test_cases.length) {
        alert("Test Cases required");
        return false;
      }
      if (!this.state.settings.length) {
        alert("Add Settings");
        return false;
      }
    } else {
      alert("All fields are mandatory");
      return false;
    }
    // call api

    // set to initial state on successfull response

    form.append("challenge_details", JSON.stringify(data));
    form.append("test_cases", JSON.stringify(test_cases));
    form.append("settings", JSON.stringify(this.state.settings));
    for (let a = 0; a < this.state.test_input.length; a++) {
      form.append(
        `test_case_input${a}`,
        this.state.test_input[a],
        this.state.test_input[a].name
      );
    }
    for (let b = 0; b < this.state.test_output.length; b++) {
      form.append(
        `test_case_output${b}`,
        this.state.test_output[b],
        this.state.test_output[b].name
      );
    }
    // console.log(form)
    const { token } = this.props;
    console.log(form, JSON.stringify(form))
    axios
      .post(`/challenge/${this.state.challenge_name}`, form, {
        headers: {
          Authorization: token
        }
      })
      .then(res=>{
        if(!res.data){
          this.setState({resMessage: "add failed"})
        }
        else{
          this.setState({resMessage: "add successful"})
        }
        setTimeout(()=>this.setState({resMessage:""}),2000)
      })
      .catch(err=>console.log(err))
  };

  handleReset = () => {
    this.setState({...initialState})
  }

  render() {
    const {
      detailsTab,
      settingsTab,
      testCasesTab,
      challenge_name: challengeName,
      difficulty,
      description,
      problem_statement: problemStatement,
      input_format: inputFormat,
      constraints,
      output_format: outputFormat,
      settings,
      sample_input,
      sample_output,
      test_cases: testCases,
      resMessage
    } = this.state;
    let viewTab;
    if (detailsTab) {
      viewTab = (
        <ChallengeDetails
          handleChange={this.handleDetailsChange}
          challenge_name={challengeName}
          difficulty={difficulty}
          description={description}
          problem_statement={problemStatement}
          input_format={inputFormat}
          constraints={constraints}
          output_format={outputFormat}
          sample_input={sample_input}
          sample_output={sample_output}
        />
      );
    } else if (settingsTab) {
      viewTab = (
        <ChallengeSettings addSettings={this.addSettings}
                           settings={settings} 
                           delSettings={this.delSettings}
                           />
      );
    } else {
      viewTab = (
        <AddTestCases delTestCase={this.delTestCase} test_cases={testCases} addTestCase={this.addTestCase} />
      );
    }
    return (
      <div className="container p-3">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              type="button"
              onClick={() => this.handleTabChange("details")}
              className={`nav-link ${detailsTab && "active"}`}
            >
              Details
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              onClick={() => this.handleTabChange("test")}
              className={`nav-link ${testCasesTab && "active"}`}
            >
              Test Cases
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              onClick={() => this.handleTabChange("settings")}
              className={`nav-link ${settingsTab && "active"}`}
            >
              Settings
            </button>
          </li>
        </ul>
        {viewTab}
        <button className="btn btn-dark active text-right"
                onClick={this.handleReset}>
          RESET DATA
        </button>
        <button
          type="button"
          onClick={this.createChallenge}
          className="btn btn-raised btn-dark btn-block"
        >
          Add Challenge
        </button>
        <div>
          {resMessage!="" && resMessage}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.authReducer.token
});

export default connect(mapStateToProps)(CreateChallenge);
