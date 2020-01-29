import React from "react";

function ChallengeLeaderboard() {
  return (
    <div className="container">
      <div className="mt-5 mb-4">
        <h3 className="font-weight-bold">Challenge Leaderboard</h3>
      </div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">
              <i className="fas fa-crown" />
              <span> Rank</span>
            </th>
            <th scope="col">Username</th>
            <th scope="col">Total Mark</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ChallengeLeaderboard;
