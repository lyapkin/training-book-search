import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {getBooks} from '../redux/data-reducer/actions'

import '../component-styles/LoadMoreBtn.css'

const LoadMoreBtn = () => {
	const data = useSelector(state => state.data.data)
	const curReqParams = useSelector(state => state.curReqParams)
	
	const dispatch = useDispatch()
	
	return (
		data.books.length < data.totalItems ?
		<div className='load-more'>
			<button onClick={() => dispatch(getBooks(curReqParams, true))}>Load more</button>
		</div> :
		null
	)
}

export default LoadMoreBtn