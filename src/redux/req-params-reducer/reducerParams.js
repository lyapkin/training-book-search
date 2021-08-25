import {SAVE_REQ_PARAMS} from './actionTypes'

const initialState = {
	searchString: '',
	category: '',
	order: ''
}

const reducerParams = (state=initialState, action) => {
	switch (action.type) {
		case SAVE_REQ_PARAMS:
			return action.payload
		default:
			return state
	}	
}

export default reducerParams