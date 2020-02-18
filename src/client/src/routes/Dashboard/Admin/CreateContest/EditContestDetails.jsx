/*eslint-disable*/
import React, { useState, useEffect } from "react";
import AddContestDetails from "../../../../components/AddContestDetails/AddContestDetails";
import AddChallenges from "../../../../components/AddChallenges/AddChallenges";
import axios from "../../../../utils/axiosInterceptor";
import { connect } from "react-redux";

const initialState = {
  detailsTab: true,
  challengesTab: false,
  contest_name: "",
  start_date: "",
  start_time: "",
  end_date: "",
  end_time: "",
  details: "",
  show_leaderboard: false,
  challenges: []
};

function EditContestDetails({
  token,
  contestId
}) {
  const [state, setState] = useState(initialState)
  const addChallengeId = id => {
    setState({
      ...state,
      challenges: [...state.challenges, id]
    });
  };

  const handleTabChange = tab => {
    if (tab === "details") {
      setState({
        ...state,
        detailsTab: true,
        challengesTab: false
      });
    } else if (tab === "challenges") {
      setState({
        ...state,
        detailsTab: false,
        challengesTab: true
      });
    }
  };

  const handleDetailsChange = event => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;

    setState({
      ...state,
      [name]: value
    });
  };

useEffect(() => {
    //   send the data here
    const { contest_name } = state;
    const data = state;
    // remove some of the unwanted data. sending unwanted data
    axios
      .get(`contest/${contestId}`,
      {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
          const {data} = res
          const {
            contest_data: contest,
            data: challenges
          } = data
          const {
            contest_name,
            contest_id,
            start_date,
            start_time,
            created_at,
            details,
            end_date,
            end_time,
            max_score,
            show_leaderboard
          } = contest
        setState({ 
          ...state,
          contest_name,
          contest_id,
          start_date:start_date.split("/").reverse().join("-"),
          start_time,
          end_date: end_date.split("/").reverse().join("-"),
          end_time,
          details,
          show_leaderboard,
          challenges
         });
      });
  },[])
  
    const {
      detailsTab,
      challengesTab,
      contest_name,
      start_date,
      start_time,
      end_date,
      end_time,
      details,
      show_leaderboard
    } = state;
    const contest_details = {
      contest_name,
      start_date,
      start_time,
      end_date,
      end_time,
      details,
      show_leaderboard
    };
    return (
      <div className="container p-3">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              onClick={() => handleTabChange("details")}
              className={`nav-link ${detailsTab && "active"}`}
            >
              Details
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => handleTabChange("challenges")}
              className={`nav-link ${challengesTab && "active"}`}
            >
              Challenges
            </button>
          </li>
        </ul>
        <h3>Add Contest Details & Challenges</h3>

        {detailsTab ? (
          <AddContestDetails
            handleDetailsChange={handleDetailsChange}
            {...contest_details}
          />
        ) : (
          <AddChallenges
            addChallengeId={addChallengeId}
            challengeIds={state.challenges}
          />
        )}
        <br />
        <br />
        <button
          onClick={()=>{}}
          className="btn btn-raised btn-dark btn-block"
        >
          Update Contest
        </button>
      </div>
    );

}

const mapStateToProps = state => ({
  token: state.authReducer.token
});

export default connect(mapStateToProps)(EditContestDetails);
