import {
  SUBMIT_PAGE_ROUTE_REQUEST,
  SUBMIT_PAGE_ROUTE_EXIT,
  SUBMIT_CODE_REQUEST,
  SUBMIT_CODE_SUCCESS,
  SUBMIT_CODE_FAILURE,
  SUBMIT_TEST_CASE_REQUEST,
  SUBMIT_TEST_CASE_FAILURE,
  SUBMIT_TEST_CASE_SUCCESS
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
  isTestCasesDataReady: false,
  testCaseResults: [],
  sumbissonId: "",
  timeLimit: "",
  codeFilePath: "",
  submitPath: "",
  testCasePending: null,
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
        errorMessage: "",
        isTestCasesDataReady: false,
        testCaseResults: [],
        sumbissonId: "",
        timeLimit: "",
        codeFilePath: "",
        submitPath: "",
        testCasePending: null,
        score: 0
      };
    }

    case SUBMIT_CODE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: false,
        testCaseResults: payload.test_cases.map(a=>({ ...a, result: "pending" })),
        isTestCasesDataReady: true,
        score: payload.total_marks,
        codeFilePath: payload.code_file_path,
        submitPath: payload.path,
        timeLimit: payload.time_limit,
        sumbissonId: payload.submission_id
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

    case SUBMIT_TEST_CASE_REQUEST:
      return {
        ...state,
        testCasePending: state.testCaseResults.length
      }
    
    case SUBMIT_TEST_CASE_SUCCESS:{
      let result = payload.sample_result
      let id = payload.test_case_id
      return {
        ...state,
        testCasePending: state.testCasePending - 1,
        testCaseResults: state.testCaseResults.map(a=>id===a.id?result?{...a, result:true}:{...a,result:false}:{...a})
      }
    }
    case SUBMIT_TEST_CASE_FAILURE:{
      let result = payload.sample_result
      let id = payload.test_case_id
      return {
        ...state,
        testCasePending: state.testCasePending -1,
        testCaseResults: state.testCaseResults.map(a=>id===a.id?result?{...a, result:true}:{...a,result:false}:{...a})
      }
    }
    default:
      return state;
  }
};
