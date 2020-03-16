/* eslint-disable no-unused-vars */
import {
  FETCH_USER_SUBMISSIONS,
  VIEW_USER_CODE,
  FETCH_ALL_CONTESTS_FAILURE,
  FETCH_ALL_CONTESTS_SUCCESS,
  FETCH_ALL_CONTESTS_REQUEST,
  FETCH_ALL_USERS_FAILURE,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_REQUEST,
  FETCH_ALL_CHALLENGES_REQUEST,
  FETCH_ALL_CHALLENGES_SUCCESS,
  FETCH_ALL_CHALLENGES_FAILURE,
  FETCH_CONTEST_REQUEST,
  FETCH_CONTEST_SUCCESS,
  FETCH_CONTEST_FAILURE,
  FETCH_CHALLENGE_REQUEST,
  FETCH_CHALLENGE_SUCCESS,
  FETCH_CHALLENGE_FAILURE,
  UPDATE_CHALLENGE_REQUEST,
  UPDATE_CHALLENGE_SUCCESS,
  UPDATE_CHALLENGE_FAILURE
} from "./actionType";

const initState = {
  userSubmissions: {
    submissions: [],
    viewCode: "",
    viewLanguage: ""
  },
  contests: [],
  allChallenges: [],
  isLoading: false,
  error: false,
  errorType: "",
  errorMessage: "",
  users: [],
  challenge: {}
};

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ALL_CONTESTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
        errorType: "",
        errorMessage: ""
      };
    case FETCH_ALL_CONTESTS_SUCCESS:
      return {
        ...state,
        contests: [...payload.contests],
        isLoading: false
      };
    case FETCH_ALL_CONTESTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorType: "contest",
        errorMessage: "Fetching contest has failed"
      };
    case FETCH_CHALLENGE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
        errorType: "",
        errorMessage: ""
      };
    case FETCH_CHALLENGE_SUCCESS:
      return {
        ...state,
        challenge: { ...payload.challenge },
        isLoading: false
      };
    case FETCH_CHALLENGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorType: "challenge",
        errorMessage: "Fetching challenge has failed"
      };
    case UPDATE_CHALLENGE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
        errorType: "",
        errorMessage: ""
      };
    case UPDATE_CHALLENGE_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case UPDATE_CHALLENGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorType: "challenge",
        errorMessage: "Update challenge has failed"
      };
    case FETCH_ALL_CHALLENGES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
        errorType: "",
        errorMessage: ""
      };
    case FETCH_ALL_CHALLENGES_SUCCESS:
      return {
        ...state,
        allChallenges: [...payload.challenges],
        isLoading: false
      };
    case FETCH_ALL_CHALLENGES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorType: "challenges",
        errorMessage: "Fetching challenges has failed"
      };
    case FETCH_ALL_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
        errorType: "",
        errorMessage: "",
        users: []
      };
    case FETCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload.data
      };
    case FETCH_ALL_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorType: "get users",
        errorMessage: "Fetching users has failed"
      };
    // NOT VERIFIED
    case FETCH_USER_SUBMISSIONS: {
      return {
        ...state
      };
    }
    case VIEW_USER_CODE: {
      const submissions = [...state.userSubmissions.submissions];
      let code = "";
      let language = "";
      submissions.forEach(submission => {
        if (submission.id === payload) {
          code = submission.code;
          language = submission.language;
        }
      });
      return {
        ...state,
        userSubmissions: {
          ...state.userSubmissions,
          viewCode: code,
          viewLanguage: language
        }
      };
    }
    default:
      return {
        ...state
      };
  }
};
