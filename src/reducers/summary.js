import { GET_SUMMARY, PUT_SUMMARY_ERROR, PUT_SUMMARY_SUCCESS } from "../constants";

const initialState = { summary: JSON.parse(sessionStorage.getItem("Summary")), isError: undefined };

export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case GET_SUMMARY:
      sessionStorage.setItem("Summary", JSON.stringify(action.summary));
      return { ...state, summary: action.summary };
    case PUT_SUMMARY_ERROR:
      return { ...state, isError: true };
    case PUT_SUMMARY_SUCCESS:
      return { ...state, isError: false };
    default:
      return state;
  }
}
