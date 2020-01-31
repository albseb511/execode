import React from "react";
import { Link } from "react-router-dom";

const AdminSettings = () => {
    return (
        <div className="container">
            <h1>Control Panel</h1>
        {   [{
                body: "View all users in the organisation",
                linkTitle: "ALL USERS",
                path: "users"
            },
            {
                body: "Create new users in the organisation",
                linkTitle: "CREATE USERS",
                path: "users-create"
            }].map(card=>(
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
    )
}

export default AdminSettings
