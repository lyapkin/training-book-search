import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory, useLocation} from 'react-router-dom'

import '../component-styles/BooksList.css'

import {changeData} from '../redux/data-reducer/actions'

const BooksList = () => {
	const books = useSelector(state => state.data.data.books)
	const totalItems = useSelector(state => state.data.data.totalItems)

	const history = useHistory()
	const location = useLocation()

	const dispatch = useDispatch()

	useEffect(() => {
		if (location.state?.totalItems === 0) {
			history.replace(`/${location.search}`, {books: books, totalItems: totalItems})
		}
	}, [books])

	useEffect(() => {
		if (location.state?.totalItems) {
			dispatch(changeData(location.state))
		}
	}, [location.search])
	
	const list = books.map(book => (
			<article className='booklist__item' key={book.id}>
				<img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''} alt=''/>
				<Link to={`/${book.id}`} >{book.volumeInfo.title}</Link>
				<span>Authors: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : ''}</span>
				<span>Category: {book.volumeInfo.mainCategory}</span>
			</article>
		)
	)

	return (
		<section className='search-result'>
			
			{totalItems ? <div>Found {totalItems} results</div> : null}
			<div className='booklist'>	
				{list}
			</div>
			
		</section>
	)
}

export default BooksList