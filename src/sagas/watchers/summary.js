import { put, takeLatest, call } from "redux-saga/effects";

import { CREATE_SUBSCRIPTION, PUT_SUMMARY } from "../../constants";
import { getSummary, putSummaryError, putSummarySuccess } from "../../actions";
import { createSubscription, putSummary } from "../../lib/api";

function* watchGetDataSaga(offerID) {
  const q = yield call(createSubscription, offerID);
  yield put(getSummary(q));
}

function* watchPutDataSaga(summary) {
  const res = yield call(putSummary, summary);
  if (res.data.error === false) {
    yield put(putSummarySuccess());
  } else {
    yield put(putSummaryError());
  }
}

export default function* watchSAGA() {
  yield takeLatest(CREATE_SUBSCRIPTION, watchGetDataSaga);
  yield takeLatest(PUT_SUMMARY, watchPutDataSaga);
}
