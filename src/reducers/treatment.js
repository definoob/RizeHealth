import { SET_TREATMENT } from '../constants';

const initialState = { treatment: undefined };

export default function setBrowserInfo (state = initialState, action) {
	switch (action.type) {
		case SET_TREATMENT:
			return { ...state, treatment: action.treatment };
		default:
			return state;
	}
}
