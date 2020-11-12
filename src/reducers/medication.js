import { SET_MEDICATION } from '../constants';

const initialState = { medication: [] };

export default function setBrowserInfo (state = initialState, action) {
	switch (action.type) {
		case SET_MEDICATION:
			return {
				...state,
				medication : action.medication
			};
		default:
			return state;
	}
}
