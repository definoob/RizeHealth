import { SET_ALLERGY } from '../constants';

const initialState = { allergy: [] };

export default function setBrowserInfo (state = initialState, action) {
	switch (action.type) {
		case SET_ALLERGY:
			return { ...state, allergy: action.allergy };
		default:
			return state;
	}
}
