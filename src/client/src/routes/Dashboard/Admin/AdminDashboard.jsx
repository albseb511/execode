import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <div>
        {[
          {
            path: "all-contest",
            body: "View all your contests",
            linkTitle: "Contests"
          },
          {
            path: "create-contest",
            body:
              "Create a new contest. A contest should have atleast one challenge/problem",
            linkTitle: "Create Contest"
          },
          {
            path: "create-challenge",
            body: "Create new problem statements or challenges for users",
            linkTitle: "Create Problems"
          }
        ].map(card => (
          <div className="row border mb-3 mt-5">
            <div className="col-md-7">
              <div className="py-2">
                <div className="card-body">{card.body}</div>
              </div>
            </div>
            <div className="col-md-4 py-3">
              <Link
                className="btn btn-outline-dark btn-block btn-lg"
                to={`/dashboard/admin/${card.path}`}
                role="button"
              >
                {card.linkTitle}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
