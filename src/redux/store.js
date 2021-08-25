import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducerData from './data-reducer/reducerData'
import reducerDatum from './datum-reducer/reducerDatum'
import reducerParams from './req-params-reducer/reducerParams'

const rootReducer = combineReducers({
	data: reducerData,
	curReqParams: reducerParams,
	oneBook: reducerDatum
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store