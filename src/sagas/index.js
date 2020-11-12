import { all, fork } from 'redux-saga/effects';

import watchGetQuestionSaga from './watchers/getQuestion';
import userSaga from './watchers/userSaga';
import allergySaga from './watchers/allergy';
import medicationSaga from './watchers/medication';
import treatmentSaga from './watchers/treatment';
import summarySaga from './watchers/summary';

export default function* root () {
	yield all([
		fork(watchGetQuestionSaga),
		fork(userSaga),
		fork(allergySaga),
		fork(medicationSaga),
		fork(treatmentSaga),
		fork(summarySaga)
	]);
}
