import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

import {getBooks} from '../redux/data-reducer/actions'
import {saveReqParams} from '../redux/req-params-reducer/actions'

import '../component-styles/Search.css'



const Search = () => {
	const [invalidSearch, setInvalidSearch] = useState(false)
	const [searchReq, setSearchReq] = useState({
		searchString: '',
		category: '',
		order: 'relevance'
	})

	const history = useHistory()
	const dispatch = useDispatch()
	
	const handleSubmit = e => {
		e.preventDefault()

		if (searchReq.searchString.trim() !== '') {
			dispatch(saveReqParams(searchReq))
			dispatch(getBooks(searchReq, false))
			history.push('/')
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