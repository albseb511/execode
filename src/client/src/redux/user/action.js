/* eslint-disable radix */
import {
  SUBMIT_PAGE_ROUTE_REQUEST,
  SUBMIT_CODE_REQUEST,
  SUBMIT_CODE_SUCCESS,
  SUBMIT_CODE_FAILURE,
  SUBMIT_PAGE_ROUTE_EXIT,
  EVENT_CODE_REQUEST,
  EVENT_CODE_SUCCESS,
  EVENT_CODE_FAILURE
} from "./actionTypes";
import axios from "../../utils/axiosInterceptor";

export const submitPageRouteRequest = payload => ({
  type: SUBMIT_PAGE_ROUTE_REQUEST,
  payload
});

export const submitPageRouteExit = payload => ({
  type: SUBMIT_PAGE_ROUTE_EXIT,
  payload
});

export const submitCodeRequest = () => ({
  type: SUBMIT_CODE_REQUEST
});

export const submitCodeSuccess = payload => ({
  type: SUBMIT_CODE_SUCCESS,
  payload
});

export const submitCodeFailure = payload => ({
  type: SUBMIT_CODE_FAILURE,
  payload
});

export const getSubmitResults = payload => {
  submitCodeRequest();
  return dispatch => {
    axios
      .post(
        "/submit",
        {
          challenge_id: payload.challenge_id,
          contest_id: payload.contest_id,
          code: payload.code,
          language: payload.language,
          action: "submit code"
        },
        {
          headers: {
            Authorization: payload.token
          }
        }
      )
      .then(res => dispatch(submitCodeSuccess(res.data)))
      .catch(err => dispatch(submitCodeFailure(err)));
  };
};

export const eventCodeRequest = () => ({
  type: EVENT_CODE_REQUEST
});

export const eventCodeSuccess = payload => ({
  type: EVENT_CODE_SUCCESS,
  payload
});

export const eventCodeFailure = payload => ({
  type: EVENT_CODE_FAILURE,
  payload
});

export const eventCodeSubmit = payload => {
  eventCodeRequest();
  return dispatch => {
    axios
      .post(
        "/event",
        {
          event: payload.event,
          text: payload.text,
          contest_id: parseInt(payload.contestId),
          challenge_id: parseInt(payload.challengeId),
          action: "event logging"
        },
        {
          headers: {
            Authorization: payload.token
          }
        }
      )
      .then(res => dispatch(eventCodeSuccess(res.data)))
      .catch(err => dispatch(eventCodeFailure(err)));
  };
};
