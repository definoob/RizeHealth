import { SUCCESS_SIGNUP, FAILED_SIGNUP, REMOVE_ERROR_MSG, VERIFY_SUCCESS, VERIFY_FAILED, VERIFY_CLEAR } from "../constants";
const initialState = {
  loggedIn: false,
  verified: sessionStorage.getItem("verified"),
  error: undefined,
  errorCode: "",
  errMsg: ""
};

export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_SIGNUP:
      sessionStorage.setItem("loggedIn", true);
      return { ...state, loggedIn: true };
    case FAILED_SIGNUP:
      sessionStorage.setItem("loggedIn", false);
      return { ...state, error: true, errorCode: action.errorCode, errMsg: action.errMsg };
    case REMOVE_ERROR_MSG:
      return { ...state, error: undefined, errorCode: "", errMsg: "" };
    case VERIFY_SUCCESS:
      sessionStorage.setItem("verified", true);
      return { ...state, verified: true };
    case VERIFY_FAILED:
      sessionStorage.setItem("verified", false);
      return { ...state, verified: false };
    case VERIFY_CLEAR:
      sessionStorage.removeItem("verified");
      return { ...state, verified: undefined };
    default:
      return state;
  }
}
