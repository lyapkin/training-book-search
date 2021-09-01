import {
	GET_BOOKS_REQUEST,
	GET_BOOKS_SUCCESS,
	GET_BOOKS_FAILURE,
	GET_MORE_BOOKS_REQUEST,
	GET_MORE_BOOKS_SUCCESS,
	GET_MORE_BOOKS_FAILURE,
	CHANGE_DATA
} from './actionTypes'

const initialState = {
	loading: false,
	data: {
		books: [],
		totalItems: 0
	},
	error: null
}

const reducerData = (state=initialState, action) => {
	switch(action.type) {
		case CHANGE_DATA:
			return {
				...state,
				data: action.payload
			}
		case GET_BOOKS_REQUEST:
			return {
				...state,
				loading: true,
				data: {
					books: [],
					totalItems: 0
				}
			}
		case GET_MORE_BOOKS_REQUEST:
			return {
				...state,
				loading: true
			}
		case GET_BOOKS_SUCCESS:
			return {
				loading: false,
				data: action.payload,
				error: null
			}
		case GET_MORE_BOOKS_SUCCESS:
			return {
				loading: false,
				data: {
					...state.data,
					books: [...state.data.books, ...action.payload]
				},
				error: null
			}
		case GET_BOOKS_FAILURE:
			return {
				loading: false,
				data: {
					books: [],
					totalItems: 0
				},
				error: action.payload
			}
		case GET_MORE_BOOKS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload
			}
		default:
			return state
	}
}

export default reducerData