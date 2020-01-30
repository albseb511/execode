/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-template */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
import React from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "../../../../utils/axiosInterceptor";

class ContestLeaderBoardUser extends React.Component {
  constructor() {
    super();
    this.state = {
      leaderboard: []
    };
  }

  getLeaderBoardData = () => {
    // get the leader board data and set state
    // set auth header
    const { contestId } = this.props;
    axios.get(`contest/${contestId}/leaderboard`).then(res => {
      if (res.data && res.data.leaderboard) {
        this.setState({ leaderboard: res.data.leaderboard });
      }
    });
  };

  componentDidMount() {
    //
    this.getLeaderBoardData();
  }

  render() {
    const { leaderboard } = this.state;
    return (
      <>
        <div className="row d-flex justify-content-center">
          <table
            className="table table-striped text-center border border-dark col-md-8"
            style={{ marginTop: "100px" }}
          >
            <thead>
              <tr className="p-3 mb-2 thead-dark">
                {/* <th scope="col">S.no</th> */}
                <th scope="col">Name</th>
                <th scope="col">Score</th>
                <th scope="col">Rank</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard &&
                leaderboard.map((ele, index) => {
                  return (
                    <tr key={ele.email}>
                      <td>{ele.name}</td>
                      <td>{ele.total}</td>
                      <td>{ele.rank}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default ContestLeaderBoardUser;
