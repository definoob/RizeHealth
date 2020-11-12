import { put, takeLatest, call } from "redux-saga/effects";

import { REQUEST_SIGNUP, VERIFY_USER } from "../../constants";
import { successSignup, verifySuccess, failedSignup, verifyFail } from "../../actions";
import { signup, verify } from "../../lib/api";

function* requestSignup(action) {
  try {
    const { email, password, zip, dob } = action;
    const data = yield call(signup, email, password, zip, dob);
    if (data.error === false) yield put(successSignup());
    if (data.error === true) yield put(failedSignup(data.errorCode, data.errMsg));
  } catch (e) {}
}

function* verifyUser(action) {
  try {
    const { code } = action;
    const res = yield call(verify, code);
    if (res === false) yield put(verifySuccess());
    else yield put(verifyFail());
  } catch (e) {}
}

export default function* watchSaga() {
  yield takeLatest(REQUEST_SIGNUP, requestSignup);
  yield takeLatest(VERIFY_USER, verifyUser);
}
