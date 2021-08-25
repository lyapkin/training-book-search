import {
	GET_ONE_BOOK_REQUEST,
	GET_ONE_BOOK_SUCCESS,
	GET_ONE_BOOK_FAILURE
} from './actionTypes'

import {API} from '../../env'


const getOneBookRequest = () => {
	return {
		type: GET_ONE_BOOK_REQUEST
	}
}

const getOneBookSuccess = data => {
	return {
		type: GET_ONE_BOOK_SUCCESS,
		payload: data
	}
}

const getOneBookFailure = error => {
	return {
		type: GET_ONE_BOOK_FAILURE,
		payload: error
	}
}

export const getOneBook = (id) => {
	return (dispatch) => {
		dispatch(getOneBookRequest())
		
		fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API}`)
			.then(res => {
				if (res.ok) {
					return res.json()
				} else {
					throw new Error(res.status)
				}
			})
			.then(res => {
				dispatch(getOneBookSuccess(res.volumeInfo))
			})
			.catch(err => {
				dispatch(getOneBookFailure(err.message))
				
			})
	}
}

