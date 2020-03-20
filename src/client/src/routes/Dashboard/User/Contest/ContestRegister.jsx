/*eslint-disable*/
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect
} from "react-router-dom";
import axios from "../../../../utils/axiosInterceptor";
import { connect } from "react-redux";

const ContestRegister = ({
  isAuth,
  token,
  email,
  error,
  errorMessage,
  isLoading
}) => {
  let { id } = useParams();
  const [vailddata, updatevailddata] = useState([]);
  console.log(vailddata);
  const [contestSign, updatecontestSign] = useState([]);
  const [idFromButtonClick, setIdFromButtonClick] = useState(id);

  console.log(contestSign);
  useEffect(() => {
    axios
      .post(
        `/validatesignup`,
        {
          contest_id: id
        },
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(response => {
        console.log(response);
        updatevailddata(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);
  useEffect(() => {
    async function signContest() {
      try {
        const response = await axios.post(
          `/signupcontest`,
          {
            contest_id: id
          },
          {
            headers: {
              Authorization: token
            }
          }
        );
        updatecontestSign(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    signContest();
  }, [id]);
  const handleClick = () => {
    setIdFromButtonClick(id);
  };
  return isAuth && vailddata.signup == true && contestSign.created == false ? (
    <div>
      <Redirect to={`/dashboard/contest/${id}`} />
    </div>
  ) : isAuth && vailddata.signup == false ? (
    <div>
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container text-center">
            <h1>
              Hello <span className="text-danger">{email.split("@")[0]} </span>
              You're Invited contest id
              <span className="text-danger">{id}</span>
            </h1>
            <p className="lead">
              Coding contest to test your understanding of data structures and
              algorithms
            </p>
            <div className="py-3">
              <Link
                type="button"
                onClick={handleClick}
                to={`/dashboard/contest/${id}`}
                className="btn btn-dark"
              >
                <i className="fas fa-sign-in-alt" />
                <span> enter your contest </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4 className="text-center">Rules</h4>
              <b>DISQUALIFICATION</b>
              <ul className="mt-3">
                <li>Copying code from stackoverflow or by Googling</li>
                <li>Seen browsing or referring any code</li>
              </ul>
            </div>
            <div className="col-md-12">
              <h4 className="text-center">Scoring</h4>
              <ul className="mt-3">
                <li>Each challenge has a pre-determined score.</li>
                <li>
                  A participant’s score depends on the number of test cases a
                  participant’s code submission successfully passes.
                </li>
                <li>
                  If a participant submits more than one solution per challenge,
                  then the participant’s score will reflect the highest score
                  achieved. In a game challenge, the participant's score will
                  reflect the last code submission.
                </li>
                <li>
                  Participants are ranked by score. If two or more participants
                  achieve the same score, then the tie is broken by the total
                  time taken to submit the last solution resulting in a higher
                  score
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="container py-5 text-center">
        <img src="https://img.icons8.com/doodle/120/000000/stop-sign--v1.png" />
        <h1>You Need Login to Access this Page!</h1>
        <div className="py-3">
          <Link to={`/login`} className="btn btn-dark">
            <span> Login with Your Account </span>
          </Link>
          <p className="mt-3 lead">
            if You have account
            <Link to={`/register`} className="font-weight-bold">
              <span> Click Register to create account </span>
            </Link>
            then come back here..
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuth: state.authReducer.isAuth,
  isLoading: state.authReducer.isLoading,
  token: state.authReducer.token,
  error: state.authReducer.error,
  errorMessage: state.authReducer.errorMessage,
  email: state.authReducer.email
});

const mapDispatchToProps = dispatch => ({
  vaildSignupContests: payload => dispatch(vaildSignupContests(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContestRegister);
