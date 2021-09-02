import './App.css';
import {Provider} from 'react-redux'
import store from './redux/store'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Search from './components/Search'
import Home from './components/Home'
import Book from './components/Book'

function App() {
  return (
    <Provider store={store}>
	  	<Router>
	  		<Search />
	  		<Switch>
	  			<Route exact path='/training-book-search'>
	    			<Home />
	    		</Route>
	    		<Route path='/training-book-search/:id'>
	    			<Book />
	    		</Route>
	    	</Switch>
	  	</Router>
    </Provider>
  );
}

export default App;
