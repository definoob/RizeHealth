import { put, takeLatest, call } from 'redux-saga/effects';

import { GET_TREATMENT_SAGA } from '../../constants';
import { setTreatment } from '../../actions';
import { getTreatment } from '../../lib/api';

function* watchGetTreatmentSaga (surveyType) {
	const q = yield call(getTreatment, surveyType);
	yield put(setTreatment(q));
}

export default function* watchSAGA () {
	yield takeLatest(GET_TREATMENT_SAGA, watchGetTreatmentSaga);
}
