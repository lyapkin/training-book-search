import {
	GET_ONE_BOOK_REQUEST,
	GET_ONE_BOOK_SUCCESS,
	GET_ONE_BOOK_FAILURE
} from './actionTypes'

const initialState = {
	loading: false,
	book: {},
	error: null
}

const reducerData = (state=initialState, action) => {
	switch(action.type) {
		case GET_ONE_BOOK_REQUEST:
			return {
				...state,
				loading: true
			}
		case GET_ONE_BOOK_SUCCESS:
			return {
				loading: false,
				book: action.payload,
				error: null
			}
		case GET_ONE_BOOK_FAILURE:
			return {
				loading: false,
				book: {},
				error: action.payload
			}
		default:
			return state
	}
}

export default reducerData