import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import '../component-styles/Book.css'

import {API} from '../env'

const Book = () => {
	const {id} = useParams()
	const [book, setBook] = useState({})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		setLoading(true)
		fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API}`)
			.then(res => {
				if (res.ok) {
					return res.json()
				} else {
					throw new Error(res.status)
				}
			})
			.then(res => {
				setBook(res.volumeInfo)
			})
			.catch(err => {
				setError(err.message)
				
			})
			.finally(() => setLoading(false))
	}, [])

	const content = book.title ? (
		<div className='book'>
			<img src={book.imageLinks.thumbnail} alt='' />
			<h2>Title: {book.title}</h2>
			<p className='book__categories'>Categories: {book.categories ? book.categories.join('/') : null}</p>
			<p className='book__authors'>Authors :{book.authors ? book.authors.join(', ') : null}</p>
			<div className='book__description'>
				<span>Description:</span>
				<p>{book.description}</p>
			</div>
		</div>
	) : null

	return (
		<section>
			{loading ? 'loading' : error ? error : content}
		</section>
	)
}

export default Book