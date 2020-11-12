import { SET_QUESTION, SET_QUESTION_COUNT, SET_QUESTION_ID, SET_SURVEY_IS_FINISHED, POST_ANSWER_ERROR, POST_ANSWER_SUCCESS } from "../constants";

const initialState = { question: "", questionID: undefined, questionCount: 1, isFinished: false, isError: false, errMsg: "" };

export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case SET_QUESTION:
      return { ...state, question: action.question };
    case SET_QUESTION_ID:
      return { ...state, questionID: action.questionID };
    case SET_QUESTION_COUNT:
      return { ...state, questionCount: action.x };
    case SET_SURVEY_IS_FINISHED:
      return { ...state, isFinished: action.value };
    case POST_ANSWER_ERROR:
      return { ...state, isError: true, errMsg: action.errMsg };
    case POST_ANSWER_SUCCESS:
      return { ...state, isError: false, errMsg: "" };
    default:
      return state;
  }
}
