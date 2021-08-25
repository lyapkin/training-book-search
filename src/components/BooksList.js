import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import '../component-styles/BooksList.css'

const BooksList = () => {
	const books = useSelector(state => state.data.data.books)
	const totalItems = useSelector(state => state.data.data.totalItems)
	const loading = useSelector(state => state.data.loading)
	const error = useSelector(state => state.data.error)
	
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
			{
				loading ? (
					<h2>loading</h2>
				) :
				error ? (
					<h2>{error}</h2>
				) : null
			}
			
			
			{totalItems ? <div>Found {totalItems} results</div> : null}
			<div className='booklist'>	
				{list}
			</div>
			
		</section>
	)
}

export default BooksList