import { put, takeLatest, call } from 'redux-saga/effects';

import { GET_MEDICATION_SAGA } from '../../constants';
import { setMedication } from '../../actions';
import { getMedication } from '../../lib/api';

function* watchGetMedicationSaga (keyword) {
	const q = yield call(getMedication, keyword);
	yield put(setMedication(q));
}

export default function* watchSAGA () {
	yield takeLatest(GET_MEDICATION_SAGA, watchGetMedicationSaga);
}
