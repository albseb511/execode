import {
  FETCH_USER_SUBMISSIONS,
  VIEW_USER_CODE,
  FETCH_ALL_CONTESTS_REQUEST,
  FETCH_ALL_CONTESTS_SUCCESS,
  FETCH_ALL_CONTESTS_FAILURE,
  FETCH_ALL_USERS_FAILURE,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_REQUEST,
  CREATE_CHALLENGE_REQUEST,
  CREATE_CHALLENGE_SUCCESS,
  CREATE_CHALLENGE_FAILURE,
  FETCH_ALL_CHALLENGES_REQUEST,
  FETCH_ALL_CHALLENGES_SUCCESS,
  FETCH_ALL_CHALLENGES_FAILURE,
  FETCH_CHALLENGE_REQUEST,
  FETCH_CHALLENGE_SUCCESS,
  FETCH_CHALLENGE_FAILURE
} from "./actionType";
import axios from "../../utils/axiosInterceptor";

export const fetchUserSubmissions = () => {
  return {
    type: FETCH_USER_SUBMISSIONS
  };
};

export const fetchUserCode = id => {
  return {
    type: VIEW_USER_CODE,
    payload: id
  };
};

export const fetchAllContestsRequest = payload => ({
  type: FETCH_ALL_CONTESTS_REQUEST,
  payload
});

export const fetchAllContestsSuccess = payload => ({
  type: FETCH_ALL_CONTESTS_SUCCESS,
  payload
});

export const fetchAllContestsFailure = payload => ({
  type: FETCH_ALL_CONTESTS_FAILURE,
  payload
});

export const fetchAllContests = payload => {
  return dispatch => {
    dispatch(fetchAllContestsRequest());
    return axios
      .get(
        "/contests",
        {},
        {
          headers: {
            Authorization: `JWT ${payload.token}`
          }
        }
      )
      .then(res => {
        dispatch(fetchAllContestsSuccess(res.data));
      })
      .catch(() => dispatch(fetchAllContestsFailure()));
  };
};

export const fetchChallengeRequest = payload => ({
  type: FETCH_CHALLENGE_REQUEST,
  payload
});

export const fetchChallengeSuccess = payload => ({
  type: FETCH_CHALLENGE_SUCCESS,
  payload
});

export const fetchChallengeFailure = payload => ({
  type: FETCH_CHALLENGE_FAILURE,
  payload
});

export const fetchChallenge = payload => {
  return dispatch => {
    dispatch(fetchChallengeRequest());
    return axios
      .get(
        `/challenge/${payload.challengeId}`,
        {
          headers: {
            Authorization: payload.token
          }
        }
      )
      .then(res => {
        dispatch(fetchChallengeSuccess(res.data));
      })
      .catch(() => dispatch(fetchChallengeFailure()));
  };
};

export const fetchAllChallengesRequest = payload => ({
  type: FETCH_ALL_CHALLENGES_REQUEST,
  payload
});

export const fetchAllChallengesSuccess = payload => ({
  type: FETCH_ALL_CHALLENGES_SUCCESS,
  payload
});

export const fetchAllChallengesFailure = payload => ({
  type: FETCH_ALL_CHALLENGES_FAILURE,
  payload
});

export const fetchAllChallenges = payload => {
  return dispatch => {
    dispatch(fetchAllChallengesRequest());
    return axios
      .get(
        "/challenges",
        {},
        {
          headers: {
            Authorization: `JWT ${payload.token}`
          }
        }
      )
      .then(res => {
        dispatch(fetchAllChallengesSuccess(res.data));
      })
      .catch(() => dispatch(fetchAllChallengesFailure()));
  };
};

export const fetchAllUsersRequest = payload => ({
  type: FETCH_ALL_USERS_REQUEST,
  payload
});

export const fetchAllUsersSuccess = payload => ({
  type: FETCH_ALL_USERS_SUCCESS,
  payload
});

export const fetchAllUsersFailure = payload => ({
  type: FETCH_ALL_USERS_FAILURE,
  payload
});

export const fetchAllUsers = payload => {
  return dispatch => {
    dispatch(fetchAllUsersRequest());
    return axios
      .get("/users", {
        headers: {
          Authorization: payload.token
        }
      })
      .then(res => {
        dispatch(fetchAllUsersSuccess(res.data));
      })
      .catch(() => dispatch(fetchAllUsersFailure()));
  };
};

export const createChallengeRequest = payload => ({
  type: CREATE_CHALLENGE_REQUEST,
  payload
});

export const createChallengeSuccess = payload => ({
  type: CREATE_CHALLENGE_SUCCESS,
  payload
});

export const createChallengeFailure = payload => ({
  type: CREATE_CHALLENGE_FAILURE,
  payload
});

export const createChallenge = payload => {
  return dispatch => {
    dispatch(createChallengeRequest());
    return axios
      .get("/users", {
        headers: {
          Authorization: payload.token
        }
      })
      .then(res => {
        dispatch(createChallengeSuccess(res.data));
      })
      .catch(() => dispatch(createChallengeFailure()));
  };
};
