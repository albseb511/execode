import {
  FETCH_USER_SUBMISSIONS,
  VIEW_USER_CODE,
  FETCH_ALL_CONTESTS_REQUEST,
  FETCH_ALL_CONTESTS_SUCCESS,
  FETCH_ALL_CONTESTS_FAILURE,
  FETCH_ALL_USERS_FAILURE,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_REQUEST
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
