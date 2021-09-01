import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducerData from './data-reducer/reducerData'
import reducerDatum from './datum-reducer/reducerDatum'

const rootReducer = combineReducers({
	data: reducerData,
	oneBook: reducerDatum
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store