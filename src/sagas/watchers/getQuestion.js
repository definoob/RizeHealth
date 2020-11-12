import { put, takeLatest, call } from "redux-saga/effects";

import { POST_ANSWER, GET_FIRST_QUESTION, GET_PREV_QUESTION } from "../../constants";
import { setQuestion, setQuestionID, setSurveyIsFinished, postAnswerError, postAnswerSuccess } from "../../actions";
import { postAnswer, getFirstQuestion, getPrevQuestion } from "../../lib/api";

function* postAnswer_(action) {
  try {
    const { answer } = action;
    const nextQ = yield call(postAnswer, answer);
    if (nextQ.error === true) {
      yield put(postAnswerError(nextQ.message));
    } else {
      yield put(postAnswerSuccess());
      if (nextQ.finished === true) {
        yield put(setSurveyIsFinished(true));
      } else {
        yield put(setQuestionID(nextQ.question.id));
        yield put(setQuestion(nextQ));
      }
    }
  } catch (e) {}
}

function* watchGetFirstQuestionIDSaga(action) {
  try {
    const { surveyType } = action;
    const firstQ = yield call(getFirstQuestion, surveyType);
    yield put(setQuestionID(firstQ.question.id));
    yield put(setQuestion(firstQ));
  } catch (e) {}
}

function* watchGetPrevQuestionIDSaga(action) {
  try {
    const { id } = action;
    const prevQ = yield call(getPrevQuestion, id);
    yield put(setQuestionID(prevQ.question.id));
    yield put(setQuestion(prevQ));
  } catch (e) {}
}

export default function* watchSAGA() {
  yield takeLatest(POST_ANSWER, postAnswer_);
  yield takeLatest(GET_FIRST_QUESTION, watchGetFirstQuestionIDSaga);
  yield takeLatest(GET_PREV_QUESTION, watchGetPrevQuestionIDSaga);
}
