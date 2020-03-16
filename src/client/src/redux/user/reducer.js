/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import {
  SUBMIT_PAGE_ROUTE_REQUEST,
  SUBMIT_PAGE_ROUTE_EXIT,
  SUBMIT_CODE_REQUEST,
  SUBMIT_CODE_SUCCESS,
  SUBMIT_CODE_FAILURE,
  SUBMIT_TEST_CASE_REQUEST,
  SUBMIT_TEST_CASE_FAILURE,
  SUBMIT_TEST_CASE_SUCCESS,
  SUBMIT_TEST_CASE_ENDED_FAILURE,
  SUBMIT_TEST_CASE_ENDED_SUCCESS,
  SUBMIT_TEST_CASE_ENDED_REQUEST
} from "./actionTypes";

let data = localStorage.getItem("bStore");
if (!data) {
  localStorage.setItem("bStore", "");
  data = {};
}

const initialState = {
  isSubmit: false,
  submitCode: "",
  language: "",
  isLoading: false,
  error: false,
  errorType: "",
  errorMessage: "",
  isTestCasesDataReady: false,
  testCaseResults: [],
  submissionId: "",
  timeLimit: "",
  codeFilePath: "",
  submitPath: "",
  testCasePending: null,
  score: 0,
  getTestCaseEnded: false,
  isFinalSubmitting: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SUBMIT_PAGE_ROUTE_REQUEST:
      return {
        ...state,
        isSubmit: true,
        submitCode: payload.code,
        language: payload.language
      };

    case SUBMIT_PAGE_ROUTE_EXIT:
      return {
        ...state,
        isSubmit: false,
        error: false,
        submitCode: "",
        language: "",
        isTestCasesDataReady: false,
        testCaseResults: [],
        submissionId: "",
        timeLimit: "",
        codeFilePath: "",
        submitPath: "",
        testCasePending: null,
        score: 0,
        getTestCaseEnded: false,
        isFinalSubmitting: false
      };

    case SUBMIT_CODE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
        errorMessage: ""
      };
    }

    case SUBMIT_CODE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        testCaseResults: payload.test_cases.map(a => ({
          ...a,
          result: "pending"
        })),
        isTestCasesDataReady: true,
        score: payload.total_marks,
        codeFilePath: payload.code_file_path,
        submitPath: payload.path,
        timeLimit: payload.time_limit,
        submissionId: payload.submission_id,
        testCasePending: payload.test_cases.length
      };
    }

    case SUBMIT_CODE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: true,
        errorType: "submit code",
        errorMessage: "submit code failed"
      };
    }

    case SUBMIT_TEST_CASE_REQUEST:
      return {
        ...state,
        testCasePending: state.testCaseResults.length
      };

    case SUBMIT_TEST_CASE_SUCCESS: {
      const result = payload.sample_result;
      const id = payload.test_case_id;
      const testCaseEnded = state.testCasePending === 1;
      return {
        ...state,
        testCasePending: state.testCasePending - 1,
        testCaseResults: state.testCaseResults.map(a =>
          id === a.id
            ? result
              ? {
                  ...a,
                  result: true,
                  error: payload.error_type,
                  user_error: payload.user_error
                }
              : {
                  ...a,
                  result: false,
                  error: payload.error_type,
                  user_error: payload.user_error
                }
            : { ...a }
        ),
        getTestCaseEnded: testCaseEnded
      };
    }
    case SUBMIT_TEST_CASE_FAILURE: {
      const { id } = payload;
      const testCaseEnded = state.testCasePending === 1;
      return {
        ...state,
        testCasePending: state.testCasePending - 1,
        testCaseResults: state.testCaseResults.map(a => {
          console.log(id, a.id);
          return id == a.id
            ? { ...a, result: false, error: "Server error" }
            : { ...a };
        }),
        getTestCaseEnded: testCaseEnded
      };
    }
    case SUBMIT_TEST_CASE_ENDED_REQUEST:
      return {
        ...state,
        isFinalSubmitting: true
      };

    case SUBMIT_TEST_CASE_ENDED_SUCCESS:
      return {
        ...state,
        isFinalSubmitting: false
      };

    case SUBMIT_TEST_CASE_ENDED_FAILURE:
      return {
        ...state,
        error: true,
        errorType: "marks submit",
        errorMessage: "final submit of marks failed"
      };

    default:
      return state;
  }
};
