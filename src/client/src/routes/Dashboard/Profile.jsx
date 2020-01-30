import React from "react";
import { connect } from "react-redux";

const Profile = ({ email, team, code }) => {
  return (
    <div className="container">
      <div className="jumbotron jumbotron-fluid text-center">
        <div className="container">
          {/* <img
            src="https://dummyimage.com/100x100/000/fff"
            className="rounded mx-auto d-block img-thumbnail"
            alt="profile pic"
          /> */}
          <img src="https://img.icons8.com/cotton/64/000000/gender-neutral-user--v1.png" />
          <h1 className="font-weight-bold mt-2">{email.split("@")[0]}</h1>
          <p className="lead">Masai School</p>
          <p className="lead">email: {email}</p>
          {team ? <p className="lead">cohort: {team.toUpperCase()}</p> : null}
          {code ? <p className="lead">code: {code}</p> : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  email: state.authReducer.email,
  team: state.authReducer.team,
  code: state.authReducer.code
});

export default connect(mapStateToProps)(Profile);
