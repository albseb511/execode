/* eslint-disable radix */
import {
  SUBMIT_PAGE_ROUTE_REQUEST,
  SUBMIT_CODE_REQUEST,
  SUBMIT_CODE_SUCCESS,
  SUBMIT_CODE_FAILURE,
  SUBMIT_PAGE_ROUTE_EXIT,
  EVENT_CODE_REQUEST,
  EVENT_CODE_SUCCESS,
  EVENT_CODE_FAILURE,
  SUBMIT_TEST_CASE_REQUEST,
  SUBMIT_TEST_CASE_SUCCESS,
  SUBMIT_TEST_CASE_FAILURE,
  SUBMIT_TEST_CASE_ENDED_REQUEST,
  SUBMIT_TEST_CASE_ENDED_SUCCESS,
  SUBMIT_TEST_CASE_ENDED_FAILURE
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
        "/submitcodelist",
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

export const submitTestCaseRequest = () => ({
  type: SUBMIT_TEST_CASE_REQUEST
});

export const submitTestCaseSuccess = payload => ({
  type: SUBMIT_TEST_CASE_SUCCESS,
  payload
});

export const submitTestCaseFailure = payload => ({
  type: SUBMIT_TEST_CASE_FAILURE,
  payload
});

export const submitTestCase = payload => {
  submitTestCaseRequest();
  return dispatch => {
    axios
      .post(
        "/testcaserun",
        {
          language: payload.language,
          test_id: payload.test_id,
          strength: payload.strength,
          input_file: payload.input_file,
          output_file: payload.output_file,
          path: payload.path,
          code_file_path: payload.code_file_path
        },
        {
          headers: {
            Authorization: payload.token
          },
          timeout: 10000
        }
      )
      .then(res => dispatch(submitTestCaseSuccess(res.data)))
      .catch(err => dispatch(submitTestCaseFailure({ ...err, timeout: true })));
  };
};

export const submitTestCaseEndRequest = () => ({
  type: SUBMIT_TEST_CASE_ENDED_REQUEST
});

export const submitTestCaseEndSuccess = payload => ({
  type: SUBMIT_TEST_CASE_ENDED_SUCCESS,
  payload
});

export const submitTestCaseEndFailure = payload => ({
  type: SUBMIT_TEST_CASE_ENDED_FAILURE,
  payload
});

export const submitTestCaseEnd = payload => {
  submitTestCaseEndRequest();
  return dispatch => {
    console.log(JSON.stringify(payload.test_case_info));
    axios
      .post(
        "/submitupdate",
        {
          submission_id: payload.submission_id,
          path: payload.path,
          test_case_info: JSON.stringify(payload.test_case_info),
          challenge_id: payload.challenge_id,
          contest_id: payload.contest_id
        },
        {
          headers: {
            Authorization: payload.token
          }
        }
      )
      .then(res => dispatch(submitTestCaseEndSuccess(res.data)))
      .catch(err => dispatch(submitTestCaseEndFailure(err)));
  };
};
