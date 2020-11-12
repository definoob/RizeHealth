import { combineReducers } from 'redux';

import usersReducer from './users';
import questionReducer from './question';
import allergyReducer from './allergy';
import medicationReducer from './medication';
import treatmentReducer from './treatment';
import summaryReducer from './summary';

export default combineReducers({
	usersReducer,
	questionReducer,
	allergyReducer,
	medicationReducer,
	treatmentReducer,
	summaryReducer
});
