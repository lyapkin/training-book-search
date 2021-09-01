import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useLocation } from 'react-router-dom'

import {getBooks} from '../redux/data-reducer/actions'

import '../component-styles/LoadMoreBtn.css'

const LoadMoreBtn = () => {
	const data = useSelector(state => state.data.data)
	
	const dispatch = useDispatch()

	const location = useLocation()

	const handleClick = () => {
		const paramsURL = new URLSearchParams(location.search)
		const params = {
			searchString: paramsURL.get('q'),
			category: paramsURL.get('category'),
			order: paramsURL.get('orderBy')
		}
		dispatch(getBooks(params, true))
	}

	return (
		data.books.length < data.totalItems ?
		<div className='load-more'>
			<button onClick={handleClick}>Load more</button>
		</div> :
		null
	)
}

export default LoadMoreBtn