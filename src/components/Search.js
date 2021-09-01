import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory, useLocation} from 'react-router-dom'

import {getBooks} from '../redux/data-reducer/actions'

import '../component-styles/Search.css'



const Search = () => {
	const [invalidSearch, setInvalidSearch] = useState(false)
	const [searchReq, setSearchReq] = useState({
		searchString: '',
		category: '',
		order: 'relevance'
	})

	const history = useHistory()
	const location = useLocation()
	const dispatch = useDispatch()
	
	useEffect(() => {
		// change query params data
		if (location.search !== '') {
			const params = new URLSearchParams(location.search)
			setSearchReq({
				searchString: params.get('q'),
				category: params.get('category'),
				order: params.get('orderBy')
			})
		}
	}, [location.search])
	
	const handleSubmit = e => {
		e.preventDefault()

		if (searchReq.searchString.trim() !== '') {
			
			// dispatch(saveReqParams(searchReq))
			history.push({
				pathname: `/`,
				search: `?q=${searchReq.searchString}&category=${searchReq.category}&orderBy=${searchReq.order}`
			}, {books: [], totalItems: 0})
			dispatch(getBooks(searchReq, false))
			
		} else {
			setInvalidSearch(true)
			setTimeout(() => setInvalidSearch(false), 5000)
		}
	}

	return (
		<header className='header'>
			<form onSubmit={handleSubmit}>
				<div className='header__search'>
					<input
						type='search'
						onChange={e => setSearchReq({
							...searchReq,
							searchString: e.target.value
						})}
						value={searchReq.searchString}
					/>
					<button type='submit'>Find</button>
				</div>

				<div className='header__filter'>
					<div className='header__categories'>
						<label htmlFor='categories'>Categories</label>
						<select
							id='categories'
							value={searchReq.category}
							onChange={e => setSearchReq({
								...searchReq,
								category: e.target.value
							})}
						>
							<option value=''>All</option>
							<option value='art'>Art</option>
							<option value='biography'>Biography</option>
							<option value='computers'>Computers</option>
							<option value='history'>History</option>
							<option value='medical'>Medical</option>
							<option value='poetry'>Poetry</option>
						</select>
					</div>

					<div className='header__order'>
						<label htmlFor='sort'>Sorting by</label>
						<select
							id='sort'
							value={searchReq.order}
							onChange={e => setSearchReq({
								...searchReq,
								order: e.target.value
							})}
						>
							<option value='relevance'>Relevance</option>
							<option value='newest'>Newest</option>
						</select>
					</div>
				</div>
			</form>

			{invalidSearch ? <div>Fill the input</div> : null}
		</header>
	)
}

export default Search