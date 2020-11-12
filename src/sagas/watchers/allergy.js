import { put, takeLatest, call } from 'redux-saga/effects';

import { GET_ALLERGY_SAGA } from '../../constants';
import { setAllergy } from '../../actions';
import { getAllergy } from '../../lib/api';

function* watchGetAllergySaga (keyword) {
	const q = yield call(getAllergy, keyword);
	yield put(setAllergy(q));
}

export default function* watchSAGA () {
	yield takeLatest(GET_ALLERGY_SAGA, watchGetAllergySaga);
}
