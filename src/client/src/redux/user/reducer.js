import {
  SUBMIT_PAGE_ROUTE_REQUEST,
  SUBMIT_PAGE_ROUTE_EXIT,
  SUBMIT_CODE_REQUEST,
  SUBMIT_CODE_SUCCESS,
  SUBMIT_CODE_FAILURE
} from "./actionTypes";

let data = localStorage.getItem("bStore");
if (!data) {
  localStorage.setItem("bStore", "");
  data = {};
}

const initialState = {
  isSubmit: false,
  submitCode: "print('hello')",
  language: "python",
  isLoading: false,
  error: false,
  errorMessage: "",
  testCaseResults: [],
  score: 0
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
        submitCode: "",
        language: ""
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
        testCaseResults: payload.test_case_result,
        score: payload.total_marks
      };
    }

    case SUBMIT_CODE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: "submit code failed"
      };
    }

    default:
      return state;
  }
};
