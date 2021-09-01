import React from 'react'
import {useSelector} from 'react-redux'

import BooksList from './BooksList'
import LoadMoreBtn from './LoadMoreBtn'

function Home() {
    const loading = useSelector(state => state.data.loading)
	const error = useSelector(state => state.data.error)
    const books = useSelector(state => state.data.data.books)

    return (
        <div>
            {loading && 'loading'}
            {error}
            {books.length > 0 &&
            <>
                <BooksList />
                <LoadMoreBtn />
            </>
            }
        </div>
    )
}

export default Home
