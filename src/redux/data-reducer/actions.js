import {
	GET_BOOKS_REQUEST,
	GET_MORE_BOOKS_REQUEST,
	GET_BOOKS_SUCCESS,
	GET_MORE_BOOKS_SUCCESS,
	GET_BOOKS_FAILURE,
	GET_MORE_BOOKS_FAILURE
} from './actionTypes'

import {API} from '../../env'


const getBooksRequest = () => {
	return {
		type: GET_BOOKS_REQUEST
	}
}

const getMoreBooksRequest = () => {
	return {
		type: GET_MORE_BOOKS_REQUEST
	}
}

const getBooksSuccess = data => {
	return {
		type: GET_BOOKS_SUCCESS,
		payload: data
	}
}

const getMoreBooksSuccess = data => {
	return {
		type: GET_MORE_BOOKS_SUCCESS,
		payload: data
	}
}

const getBooksFailure = error => {
	return {
		type: GET_BOOKS_FAILURE,
		payload: error
	}
}

const getMoreBooksFailure = error => {	
	return {
		type: GET_MORE_BOOKS_FAILURE,
		payload: error
	}
}

export const getBooks = (req, isLoadMore) => {
	if (!isLoadMore) {
		return (dispatch, getState) => {
			dispatch(getBooksRequest())

			const startIndex = 0
			
			fetch(`https://www.googleapis.com/books/v1/volumes?q=${req.searchString}+subject:${req.category}&orderBy=${req.order}&projection=lite&startIndex=${startIndex}&maxResults=30&fields=totalItems,items(id,volumeInfo(title,authors,imageLinks))&key=${API}`)
				.then(res => {
					if (res.ok) {
						return res.json()
					} else {
						throw new Error(res.status)
					}
				})
				.then(res => {
					const data = {
						books: res.items,
						totalItems: res.totalItems
					}
					dispatch(getBooksSuccess(data))
				})
				.catch(err => {
					dispatch(getBooksFailure(err.message))
				})
		}
	} else {
		return (dispatch, getState) => {
			dispatch(getMoreBooksRequest())

			const startIndex = getState().data.data.books.length
			
			fetch(`https://www.googleapis.com/books/v1/volumes?q=${req.searchString}+subject:${req.category}&orderBy=${req.order}&projection=lite&startIndex=${startIndex}&maxResults=30&fields=totalItems,items(id,volumeInfo(title,authors,imageLinks))&key=${API}`)
				.then(res => {
					if (res.ok) {
						return res.json()
					} else {
						throw new Error(res.status)
					}
				})
				.then(res => {
					dispatch(getMoreBooksSuccess(res.items))
				})
				.catch(err => {
					dispatch(getMoreBooksFailure(err.message))
				})
		}
	}
}

